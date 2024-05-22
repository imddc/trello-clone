import { List } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { CopyList } from './schema'

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, List>
