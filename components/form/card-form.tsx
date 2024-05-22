'use client'

import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, {
  ElementRef,
  forwardRef,
  KeyboardEventHandler,
  useRef
} from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { createCard } from '~/actions/create-card'
import { useAction } from '~/hooks/useAction'
import { Button } from '../ui/button'
import FormSubmit from './form-submit'
import FormTextarea from './form-textarea'

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`card ${data.title} created`)
        formRef.current?.reset()
        disableEditing()
      },
      onError(err) {
        toast.error(err)
      }
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing()
      }
    }

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    useEventListener('keydown', onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      execute({ title, listId, boardId: params.boardId as string })
    }

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            ref={ref}
            id="title"
            onKeyDown={onTextareaKeyDown}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="px-2 pt-2">
        <Button
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="mr-1 size-4" />
          Add a card
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'

export default CardForm
