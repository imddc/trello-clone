import { List } from 'prisma/prisma-client'
import ListForm from './list-form'

interface ListContainerProps {
  data: List[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 shrink-0" />
    </ol>
  )
}
