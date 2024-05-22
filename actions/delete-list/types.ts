import { List } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { DeleteList } from './schema'

export type InputType = z.infer<typeof DeleteList>
export type ReturnType = ActionState<InputType, List>
