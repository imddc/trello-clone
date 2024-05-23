'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { CopyList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { id, boardId } = data
  let list

  try {
    let list2Copy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    })
    if (!list2Copy) {
      return {
        error: 'list not found'
      }
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId
      },
      orderBy: {
        order: 'desc'
      },
      select: { order: true }
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        boardId: list2Copy.boardId,
        title: `${list2Copy.title} -- copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: list2Copy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      }
    })
  } catch (err) {
    return {
      error: 'faild to copy board'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
