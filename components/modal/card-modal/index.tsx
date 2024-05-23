'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { useCardModal } from '~/hooks/useCardModal'
import { fetcher } from '~/lib/fetcher'
import { CardWithList } from '~/types'
import CardModalHeader from './header'

const CardModal = () => {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  console.log(cardData)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? (
          <CardModalHeader data={cardData} />
        ) : (
          <CardModalHeader.Skeleton />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CardModal
