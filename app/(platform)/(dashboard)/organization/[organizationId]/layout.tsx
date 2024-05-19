import { auth } from '@clerk/nextjs/server'
import { startCase } from 'lodash'
import React from 'react'
import OrgControl from './_components/org-control'

interface OrganizationIdLayoutProps extends React.PropsWithChildren {}

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'organization')
  }
}

const OrganizationIdLayout = ({ children }: OrganizationIdLayoutProps) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout
