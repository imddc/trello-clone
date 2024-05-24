'use client'

import { Board } from 'prisma/prisma-client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { updataBoard } from '~/actions/update-board'
import FormInput from '~/components/form/form-input'
import { Button } from '~/components/ui/button'
import { useAction } from '~/hooks/useAction'

interface BoardTitleFormProps {
  data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const { execute, isLoading } = useAction(updataBoard, {
    onSuccess(data) {
      toast.success(`board ${data.title} updated~`)
      disableEditing()
      setTitle(data.title)
    },
    onError(err) {
      toast.error(err)
    }
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    if (title === data.title) {
      disableEditing()
      return
    }

    execute({ id: data.id, title, boardId: data.id })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          disabled={isLoading}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    )
  }

  return (
    <Button
      variant="transparent"
      className="size-auto p-1 px-2 text-lg font-bold"
      onClick={enableEditing}
    >
      {title}
    </Button>
  )
}

export default BoardTitleForm
