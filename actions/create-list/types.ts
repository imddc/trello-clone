import { List } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { CreateList } from './schema'

export type InputType = z.infer<typeof CreateList>
export type ReturnType = ActionState<InputType, List>
