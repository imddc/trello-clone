'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/crate-safe-action'
import { db } from '~/lib/db'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { id, title } = data
  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId
      },
      data: {
        title
      }
    })
  } catch (err) {
    return {
      error: 'faild to update board'
    }
  }

  revalidatePath(`/board/${id}`)
  return { data: board }
}

export const updataBoard = createSafeAction(UpdateBoard, handler)
