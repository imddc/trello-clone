'use client'

import { useQuery } from '@tanstack/react-query'
import { AuditLog } from 'prisma/prisma-client'
import React from 'react'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { useCardModal } from '~/hooks/useCardModal'
import { fetcher } from '~/lib/fetcher'
import { CardWithList } from '~/types'
import CardModalAction from './action'
import CardModalActividy from './activity'
import CardModalDescription from './description'
import CardModalHeader from './header'

const CardModal = () => {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`)
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? (
          <CardModalHeader data={cardData} />
        ) : (
          <CardModalHeader.Skeleton />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardModalDescription.Skeleton />
              ) : (
                <CardModalDescription data={cardData} />
              )}

              {!auditLogsData ? (
                <CardModalActividy.Skeleton />
              ) : (
                <CardModalActividy data={auditLogsData} />
              )}
            </div>
          </div>

          {!cardData ? (
            <CardModalAction.Skeleton />
          ) : (
            <CardModalAction data={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CardModal
