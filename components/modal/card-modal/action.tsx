'use client'

import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { copyCard } from '~/actions/copy-card'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { useAction } from '~/hooks/useAction'
import { CardWithList } from '~/types'

interface CardModalActionProps {
  data: CardWithList
}

const CardModalAction = ({ data }: CardModalActionProps) => {
  const params = useParams()
  const { execute } = useAction(copyCard, {
    onSuccess(data) {
      toast.success(`card ${data.title} copyed`)
    },
    onError(err) {
      toast.error(err)
    }
  })

  const handleCopy = () => {
    const boardId = params.boardId as string
    execute({ id: data.id, boardId })
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={handleCopy}
      >
        <Copy className="mr-2 size-4" />
        Copy
      </Button>

      <Button variant="gray" className="w-full justify-start" size="inline">
        <Trash className="mr-2 size-4" />
        Delete
      </Button>
    </div>
  )
}

CardModalAction.Skeleton = function CardModalActionSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  )
}

export default CardModalAction
