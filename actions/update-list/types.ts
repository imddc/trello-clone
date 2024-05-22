import { List } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { UpdateList } from './schema'

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>
