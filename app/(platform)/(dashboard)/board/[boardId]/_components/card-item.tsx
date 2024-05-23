import { Draggable } from '@hello-pangea/dnd'
import { Card } from 'prisma/prisma-client'
import React from 'react'
import { useCardModal } from '~/hooks/useCardModal'

interface CardItemProps {
  data: Card
  index: number
}

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal()

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
          onClick={() => cardModal.onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
