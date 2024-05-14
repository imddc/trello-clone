import React, { PropsWithChildren } from 'react'

interface ClerkLayoutProps extends PropsWithChildren {}

const ClerkLayout = ({ children }: ClerkLayoutProps) => {
  return <div className="flex-center h-full">{children}</div>
}

export default ClerkLayout
