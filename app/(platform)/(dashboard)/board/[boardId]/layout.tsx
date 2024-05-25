import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { db } from '~/lib/db'
import BoardNavBar from './_components/board-navbar'

interface BoardIdLayoutProps extends PropsWithChildren {
  params: { boardId: string }
}

export async function generateMetadata({
  params: { boardId }
}: BoardIdLayoutProps): Promise<Metadata> {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board'
    }
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    }
  })

  return {
    title: board?.title || 'Board'
  }
}

const BoardIdLayout = async ({
  children,
  params: { boardId }
}: BoardIdLayoutProps) => {
  const { orgId } = auth()
  if (!orgId) {
    return redirect('/select-org')
  }

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: boardId
    }
  })

  if (!board) {
    notFound()
  }

  return (
    <div
      className="relative size-full bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavBar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}

export default BoardIdLayout
