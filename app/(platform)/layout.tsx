import { ClerkProvider } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'

interface PlatformLayoutProps extends PropsWithChildren {}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default PlatformLayout
