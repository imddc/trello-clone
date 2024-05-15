import { ClerkProvider } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

interface PlatformLayoutProps extends PropsWithChildren {}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <Toaster richColors />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
