'use client'

import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

interface NavItemProps {
  isExpanded: boolean
  isActive: boolean
  organization: Organization
  onExpand: (id: string) => void
}

const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand
}: NavItemProps) => {
  const router = useRouter()
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="mr-2 size-4" />,
      href: `/organization/${organization.id}`
    },
    {
      label: 'Activity',
      icon: <Activity className="mr-2 size-4" />,
      href: `/organization/${organization.id}/activity`
    },
    {
      label: 'Setting',
      icon: <Settings className="mr-2 size-4" />,
      href: `/organization/${organization.id}/settings`
    },
    {
      label: 'Billing',
      icon: <CreditCard className="mr-2 size-4" />,
      href: `/organization/${organization.id}/billing`
    }
  ]

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        className={cn(
          'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 transition hover:bg-neutral-500/10 hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative size-7">
            <Image
              src={organization.imageUrl}
              fill
              sizes="30"
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>

          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => handleClick(route.href)}
            className={cn('mb-1 w-full justify-start pl-10 font-normal')}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative size-10 shrink-0">
        <Skeleton className="absolute size-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default NavItem
