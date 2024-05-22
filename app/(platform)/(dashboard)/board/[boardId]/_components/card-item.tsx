import { Card } from 'prisma/prisma-client'
import React from 'react'

interface CardItemProps {
  data: Card
}

const CardItem = ({ data }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
    >
      {data.title}
    </div>
  )
}

export default CardItem
