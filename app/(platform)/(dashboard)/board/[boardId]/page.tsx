import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '~/lib/db'

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
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })
  console.log(lists)

  return <div>Board Id Page {params.boardId}</div>
}

export default BoardIdPage
