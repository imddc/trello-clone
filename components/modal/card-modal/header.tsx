'use client'

import { QueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { updateCard } from '~/actions/update-card'
import FormInput from '~/components/form/form-input'
import { Skeleton } from '~/components/ui/skeleton'
import { useAction } from '~/hooks/useAction'
import { CardWithList } from '~/types'

interface CardModalHeaderProps {
  data: CardWithList
}

const CardModalHeader = ({ data }: CardModalHeaderProps) => {
  const queryClient = new QueryClient()
  const params = useParams()
  const [title, setTitle] = useState(data.title)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id]
      })

      toast.success(`Rename to "${data.title}"`)
      setTitle(data.title)
    },
    onError(err) {
      toast.error(err)
    }
  })

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) {
      return
    }

    execute({ title, boardId, id: data.id })
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 size-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline"> {data?.list.title} </span>
        </p>
      </div>
    </div>
  )
}

CardModalHeader.Skeleton = function CardModalHeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 size-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  )
}
export default CardModalHeader
