'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { DeleteCard } from './schema'
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
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      }
    })
  } catch (err) {
    return {
      error: 'faild to delete card'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return {
    data: card
  }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
