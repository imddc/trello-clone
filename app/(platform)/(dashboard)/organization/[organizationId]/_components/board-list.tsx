import { HelpCircle, User2 } from 'lucide-react'
import React from 'react'
import FormPopover from '~/components/form/form-popover'
import Hint from '~/components/hint'

const OrganizationIdBoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4">
        <FormPopover side="right">
          <div
            role="button"
            className="flex-col-center relative aspect-video size-full gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm"> Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description="
          Free Workspace can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 size-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

export default OrganizationIdBoardList
