import { ClerkProvider } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'

interface PlatformLayoutProps extends PropsWithChildren {}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <div className="flex-center h-full">{children}</div>
    </ClerkProvider>
  )
}

export default PlatformLayout
