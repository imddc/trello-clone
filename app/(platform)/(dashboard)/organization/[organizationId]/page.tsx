import React from 'react'

interface OrganizationIdPageProps {
  params: { organizationId: string }
}

const OrganizationIdPage = ({
  params: { organizationId }
}: OrganizationIdPageProps) => {
  return <div>OrganizationIdPage : {organizationId}</div>
}

export default OrganizationIdPage
