'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from 'prisma/prisma-client'
import { createSafeAction } from '~/lib/crate-safe-action'
import { createAuditLog } from '~/lib/create-audit-log'
import { db } from '~/lib/db'
import { UpdateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'UnAuthorized'
    }
  }

  const { id, title, boardId } = data
  let list

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      data: {
        title
      }
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE
    })
  } catch (err) {
    return {
      error: 'faild to update list'
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const updataList = createSafeAction(UpdateList, handler)
