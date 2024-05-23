import { ClerkProvider } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import ModalProvider from '~/components/provider/modal-provider'

interface PlatformLayoutProps extends PropsWithChildren {}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <Toaster richColors />
      <ModalProvider />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
