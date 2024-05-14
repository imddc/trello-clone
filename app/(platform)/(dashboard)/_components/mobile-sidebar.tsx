'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import { useMobileSidebar } from '~/hooks/useMobileSidebar'
import Sidebar from './sidebar'

const DashboardMobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const pathName = usePathname()
  const isOpen = useMobileSidebar((state) => state.isOpen)
  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [onClose, pathName])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => onOpen()}
        className="mr-2 block md:hidden"
        size="sm"
        variant="ghost"
      >
        <Menu className="size-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default DashboardMobileSidebar
