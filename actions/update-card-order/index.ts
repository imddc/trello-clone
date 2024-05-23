'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { items, boardId } = data
  let updateCards

  try {
    const transaction = items.map((item) =>
      db.card.update({
        where: {
          id: item.id,
          list: {
            board: {
              orgId
            }
          }
        },
        data: {
          order: item.order,
          listId: item.listId
        }
      })
    )

    updateCards = await db.$transaction(transaction)
  } catch (err) {
    return {
      error: 'faild to reorder'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updateCards }
}

export const updataCardOrder = createSafeAction(UpdateCardOrder, handler)
