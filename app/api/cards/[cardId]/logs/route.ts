import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ENTITY_TYPE } from 'prisma/prisma-client'
import { db } from '~/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD
      },
      orderBy: {
        createAt: 'desc'
      },
      take: 3
    })
  } catch (err) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
