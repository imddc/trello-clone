'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { CopyCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { id, boardId } = data
  let card

  try {
    let card2Copy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      }
    })
    if (!card2Copy) {
      return {
        error: 'card not found'
      }
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: card2Copy.listId
      },
      orderBy: {
        order: 'desc'
      },
      select: { order: true }
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title: card2Copy.title + ' -- copy',
        description: card2Copy.description,
        listId: card2Copy.listId,
        order: newOrder
      }
    })
  } catch (err) {
    return {
      error: 'faild to copy card'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
