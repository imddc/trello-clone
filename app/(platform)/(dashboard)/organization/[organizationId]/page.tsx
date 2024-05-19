import React, { Suspense } from 'react'
import { Separator } from '~/components/ui/separator'
import OrganizationIdBoardList from './_components/board-list'
import OrganizationIdInfo from './_components/info'

interface OrganizationIdPageProps {}

const OrganizationIdPage = async ({}: OrganizationIdPageProps) => {
  return (
    <div className="mb-20 w-full">
      <OrganizationIdInfo />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<OrganizationIdBoardList.Skeleton />}>
          <OrganizationIdBoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationIdPage
