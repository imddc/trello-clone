import { ClerkProvider } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import ModalProvider from '~/components/provider/modal-provider'
import { QueryProvier } from '~/components/provider/query-provider'

interface PlatformLayoutProps extends PropsWithChildren {}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <QueryProvier>
        <Toaster richColors />
        <ModalProvider />
        {children}
      </QueryProvier>
    </ClerkProvider>
  )
}

export default PlatformLayout
