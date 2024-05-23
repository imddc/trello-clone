'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { updataListOrder } from '~/actions/update-list-order'
import { useAction } from '~/hooks/useAction'
import { ListWithCards } from '~/types'
import ListForm from './list-form'
import ListItem from './list-item'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

const reorderlist = <T = any,>(
  list: T[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const router = useRouter()
  const [orderedData, setOrderedData] = useState(data)
  const { execute: updataListOrderExecute } = useAction(updataListOrder, {
    onSuccess() {
      toast.success('list reordered')
      router.refresh()
    },
    onError(err) {
      toast.error(err)
    }
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (e: any) => {
    const { destination, source, type } = e

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'list') {
      const items = reorderlist(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }))
      setOrderedData(items)
      // TODO: modify api
      updataListOrderExecute({ items, boardId })
    }

    if (type === 'card') {
      const newOrderedData = Array.from(orderedData)

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      // board not found
      if (!sourceList || !destList) {
        return
      }

      !sourceList.cards && (sourceList.cards = [])
      !destList.cards && (destList.cards = [])

      // same list
      if (source.droppableId === destination.droppableId) {
        // listId is same , so the sourceList and destList is same
        const reOrderedData = reorderlist(
          sourceList.cards,
          source.index,
          destination.index
        ).map((item, idx) => ({ ...item, order: idx }))

        // then change the prop cards,because of reference ,newOrderedData was changed too;
        destList.cards = reOrderedData
        setOrderedData(newOrderedData)
        // TODO: trigger server action
      } else {
        // different list
        const [movedCard] = sourceList.cards.splice(source.index, 1)
        console.log(destination)
        movedCard.listId = destination.droppableId
        destList.cards.splice(destination.index, 0, movedCard)
        sourceList.cards.forEach((item, idx) => {
          item.order = idx
        })
        destList.cards.forEach((item, idx) => {
          item.order = idx
        })
        setOrderedData(newOrderedData)
        // TODO: trigger server action
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, idx) => {
              return <ListItem key={list.id} index={idx} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
