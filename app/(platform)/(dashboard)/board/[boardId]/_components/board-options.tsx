'use client'

import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'
import { deleteBoard } from '~/actions/delete-board'
import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { useAction } from '~/hooks/useAction'

interface BoardOptionsProps {
  id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError(err) {
      toast(err)
    }
  })

  function onSubmit() {
    execute({ id })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onSubmit}
          disabled={isLoading}
          className="h-auto w-full justify-start rounded-none px-5 text-sm font-normal"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
