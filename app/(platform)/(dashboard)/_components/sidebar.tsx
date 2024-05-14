'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Accordion } from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'
import NavItem, { Organization } from './nav-item'

interface SideBarProps {
  storageKey: string
}
const DashboardSideBar = ({ storageKey }: SideBarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization()
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc
    },
    []
  )

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        defaultValue={defaultAccordionValue}
        className="space-y-2"
        type="multiple"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={organization.id === activeOrganization?.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default DashboardSideBar
