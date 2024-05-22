'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { db } from '~/lib/db'
import { createSafeAction } from './../../lib/crate-safe-action'
import { CreateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'unauthorized'
    }
  }

  const { title, boardId, listId } = data
  let card

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId
        }
      }
    })

    if (!list) {
      return {
        error: 'list is not found'
      }
    }

    const lastCard = await db.card.findFirst({
      where: {
        id: listId
      },
      orderBy: {
        order: 'desc'
      },
      select: { order: true }
    })
    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder
      }
    })
  } catch (error) {
    return {
      error: 'Failed to create'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}
export const createCard = createSafeAction(CreateCard, handler)
