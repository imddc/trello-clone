import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '~/lib/db'
import { ListContainer } from './_components/list-container'

interface BoardIdProsp {
  params: {
    boardId: string
  }
}

const BoardIdPage = async ({ params }: BoardIdProsp) => {
  const { orgId } = auth()
  if (!orgId) {
    redirect('/select-org')
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId
      }
    },
    orderBy: {
      order: 'asc'
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })
  return (
    <div className="h-full overflow-x-scroll p-4">
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  )
}

export default BoardIdPage
