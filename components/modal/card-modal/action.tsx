import { Copy, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { CardWithList } from '~/types'

interface CardModalActionProps {
  data: CardWithList
}

const CardModalAction = ({ data }: CardModalActionProps) => {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button variant="gray" className="w-full justify-start" size="inline">
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
