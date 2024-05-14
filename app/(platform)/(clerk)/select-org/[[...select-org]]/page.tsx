import { OrganizationList } from '@clerk/nextjs'
import React from 'react'

const ClerkSelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={'/organization/:id'}
      afterSelectOrganizationUrl={'/organization/:id'}
    />
  )
}

export default ClerkSelectOrgPage
