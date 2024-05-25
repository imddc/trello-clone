'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { updateCard } from '~/actions/update-card'
import FormSubmit from '~/components/form/form-submit'
import FormTextarea from '~/components/form/form-textarea'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { useAction } from '~/hooks/useAction'
import { CardWithList } from '~/types'

interface CardModalDescriptionProps {
  data: CardWithList
}
const CardModalDescription = ({ data }: CardModalDescriptionProps) => {
  const params = useParams()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id]
      })

      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id]
      })

      toast.success(`updated card '${data.title}'!`)
      disableEditing()
    },
    onError(err) {
      toast.error(err)
    }
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    const boardId = params.boardId as string
    const { id } = data

    if (description === data.description) {
      return
    }

    execute({ boardId, id, description })
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 size-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>

        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              id="description"
              className="mt-2 w-full"
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit variant="primary">Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
            onClick={enableEditing}
          >
            {data.description || 'Add a more description...'}
          </div>
        )}
      </div>
    </div>
  )
}

CardModalDescription.Skeleton = function CardModalDescriptionSkeletion() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="size-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="mb-2 h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  )
}

export default CardModalDescription
