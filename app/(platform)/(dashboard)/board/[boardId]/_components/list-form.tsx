'use client'

import { Plus, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { createList } from '~/actions/create-list'
import FormInput from '~/components/form/form-input'
import FormSubmit from '~/components/form/form-submit'
import { Button } from '~/components/ui/button'
import { useAction } from '~/hooks/useAction'
import ListWrapper from './list-wrapper'

const ListForm = () => {
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)
  const router = useRouter()

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`create list ${data.title} success`)
      disableEditing()
      router.refresh()
    }
  })

  const enabledEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list tile ..."
            errors={fieldErrors}
          />
          <input hidden readOnly value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit variant="primary">Add list</FormSubmit>
            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <X className="size-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
        onClick={enabledEditing}
      >
        <Plus className="mr-2 size-4" />
        Add a list
      </button>
    </ListWrapper>
  )
}

export default ListForm
