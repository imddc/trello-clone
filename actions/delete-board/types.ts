import { Board } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { DeleteBoard } from './schema'

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>
