'use client'

import { useEffect, useState } from 'react'
import { ListWithCards } from '~/types'
import ListForm from './list-form'
import ListItem from './list-item'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className="flex h-full gap-x-3">
      {orderedData.map((list, idx) => {
        return <ListItem key={list.id} index={idx} data={list} />
      })}
      <ListForm />
      <div className="w-1 shrink-0" />
    </ol>
  )
}
