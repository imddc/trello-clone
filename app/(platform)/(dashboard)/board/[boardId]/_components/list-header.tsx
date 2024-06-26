'use client'

import { List } from 'prisma/prisma-client'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { updataList } from '~/actions/update-list'
import FormInput from '~/components/form/form-input'
import { useAction } from '~/hooks/useAction'
import ListOptions from './list-options'

interface ListHeaderProps {
  data: List
  onAddCard: () => void
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)
  const { execute, fieldErrors } = useAction(updataList, {
    onSuccess(data) {
      setTitle(data.title)
      disableEditing()
      toast.success(`update list ${data.title} success`)
    },
    onError(err) {
      toast(err)
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
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    if (title === data.title) {
      return disableEditing()
    }
    execute({ title, id, boardId })
  }
  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} readOnly />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            readOnly
          />
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
          onClick={enableEditing}
        >
          {data.title}
        </div>
      )}

      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  )
}

export default ListHeader
