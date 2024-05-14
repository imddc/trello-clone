import Link from 'next/link'
import React from 'react'
import Logo from '~/components/logo'
import { Button } from '~/components/ui/button'

const NavBar = () => {
  return (
    <div className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="flex-between mx-auto w-full md:max-w-screen-2xl">
        <Logo />
        <div className="flex-between w-full space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
