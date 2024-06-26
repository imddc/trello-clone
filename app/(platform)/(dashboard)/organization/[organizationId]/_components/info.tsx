'use client'

import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'

const OrganizationIdInfo = () => {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <OrganizationIdInfo.Skeleton />
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Image
          sizes="60px"
          fill
          src={organization?.imageUrl!}
          alt="organization"
          className="rounded-md object-cover"
          priority
        />
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 size-3" />
          Free
        </div>
      </div>
    </div>
  )
}

OrganizationIdInfo.Skeleton = function SkeletonOrganizationIdInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Skeleton className="absolute size-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 size-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}

export default OrganizationIdInfo
