import { Card } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { DeleteCard } from './schema'

export type InputType = z.infer<typeof DeleteCard>
export type ReturnType = ActionState<InputType, Card>
