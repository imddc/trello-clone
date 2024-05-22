'use client'

import { List } from 'prisma/prisma-client'
import { useState } from 'react'
import ListForm from './list-form'

interface ListContainerProps {
  data: List[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedDate, setOrderedDate] = useState(data)

  return (
    <ol>
      <ListForm />
      <div className="w-1 shrink-0" />
    </ol>
  )
}
