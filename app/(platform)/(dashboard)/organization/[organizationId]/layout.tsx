import React from 'react'
import OrgControl from './_components/org-control'

interface OrganizationIdLayoutProps extends React.PropsWithChildren {}

const OrganizationIdLayout = ({ children }: OrganizationIdLayoutProps) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout
