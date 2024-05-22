import { MoreHorizontal, X } from 'lucide-react'
import { List } from 'prisma/prisma-client'
import React, { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { copyList } from '~/actions/copy-list'
import { deleteList } from '~/actions/delete-list'
import FormSubmit from '~/components/form/form-submit'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { useAction } from '~/hooks/useAction'

interface ListOptionsProps {
  data: List
}

const ListOptions = ({ data }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute: executeDelte } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`list ${data.title} deleted`)
      closeRef.current?.click()
    },
    onError(err) {
      toast.error(err)
    }
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`list ${data.title} copyed`)
      closeRef.current?.click()
    },
    onError(err) {
      toast.error(err)
    }
  })

  const deleteSubmit = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeDelte({ id, boardId })
  }

  const copySubmit = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 py-3 " side="bottom" align="start">
        <div className="text-center text-sm font-medium text-neutral-600">
          List actions
        </div>

        <PopoverClose asChild>
          <Button
            ref={closeRef}
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Add card...
        </Button>

        <form action={copySubmit}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormSubmit>
        </form>

        <Separator className="space-y-2" />

        <form action={deleteSubmit}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
