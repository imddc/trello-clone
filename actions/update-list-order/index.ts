'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { UpdateListOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { items, boardId } = data
  let lists

  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: {
          id: item.id,
          board: {
            orgId
          }
        },
        data: {
          order: item.order
        }
      })
    )

    lists = await db.$transaction(transaction)
  } catch (err) {
    return {
      error: 'faild to reorder'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: lists }
}

export const updataListOrder = createSafeAction(UpdateListOrder, handler)
