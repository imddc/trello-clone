'use client'

import { X } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { createBoard } from '~/actions/create-board'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { useAction } from '~/hooks/useAction'
import FormInput from './form-input'
import FormPicker from './form-picker'
import FormSubmit from './form-submit'

interface FormPopoverProps extends PropsWithChildren {
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log(data)
      toast.success('board created')
    },
    onError(error) {
      console.log(error)
      toast.error('board creation failed')
    }
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string
    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        asChild
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div>
          <div className="pb-4 text-center text-sm font-medium text-neutral-600">
            Create Board
          </div>

          <PopoverClose asChild>
            <Button
              className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          </PopoverClose>

          <form action={onSubmit}>
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInput
                errors={fieldErrors}
                id="title"
                label="Board title"
                type="text"
              />
              <FormSubmit>Create</FormSubmit>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FormPopover
