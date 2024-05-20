import { Board } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { UpdateBoard } from './schema'

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>
