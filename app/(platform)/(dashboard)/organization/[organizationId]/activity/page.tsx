import React, { Suspense } from 'react'
import { Separator } from '~/components/ui/separator'
import OrganizationIdInfo from '../_components/info'
import ActivityList from './_components/activity-list'

const OrganizationIdActivityPage = () => {
  return (
    <div className="w-full">
      <OrganizationIdInfo />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default OrganizationIdActivityPage
