import { auth } from '@clerk/nextjs/server'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FormPopover from '~/components/form/form-popover'
import Hint from '~/components/hint'
import { Skeleton } from '~/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '~/constants/limit'
import { db } from '~/lib/db'
import { getAvailableCount } from '~/lib/org-limit'

const OrganizationIdBoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const boards = await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const availableCount = await getAvailableCount()

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video size-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right">
          <div
            role="button"
            className="flex-col-center relative aspect-video size-full gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm"> Create new board</p>
            <span className="text-xs">
              {MAX_FREE_BOARDS - availableCount} remaining
            </span>
            <Hint
              sideOffset={40}
              description="
          Free Workspace can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 size-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

OrganizationIdBoardList.Skeleton = function OrganizationIdBoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
      <Skeleton className="aspect-video size-full p-2" />
    </div>
  )
}

export default OrganizationIdBoardList
