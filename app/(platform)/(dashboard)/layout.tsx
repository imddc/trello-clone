import React, { PropsWithChildren } from 'react'
import DashboardNavBar from './_components/navbar'

interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full">
      <DashboardNavBar />
      {children}
    </div>
  )
}

export default DashboardLayout
