'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ACTION, ENTITY_TYPE } from 'prisma/prisma-client'
import { createSafeAction } from '~/lib/crate-safe-action'
import { createAuditLog } from '~/lib/create-audit-log'
import { db } from '~/lib/db'
import { decreaseAvailableCount } from '~/lib/org-limit'
import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId
      }
    })

    await decreaseAvailableCount()

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE
    })
  } catch (err) {
    return {
      error: 'faild to delete board'
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
