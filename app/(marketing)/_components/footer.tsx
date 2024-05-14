import React from 'react'
import Logo from '~/components/logo'
import { Button } from '~/components/ui/button'

const FooterBar = () => {
  return (
    <div className="fixed bottom-0 flex w-full items-center border-t bg-white p-4 shadow-sm">
      <div className="flex-between mx-auto w-full md:max-w-screen-2xl">
        <Logo />
        <div className="flex-between w-full space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>

          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FooterBar
