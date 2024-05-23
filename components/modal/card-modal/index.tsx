'use client'

import React from 'react'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { useCardModal } from '~/hooks/useCardModal'

const CardModal = () => {
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>card modal</DialogContent>
    </Dialog>
  )
}

export default CardModal
