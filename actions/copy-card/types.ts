import { Card } from 'prisma/prisma-client'
import { z } from 'zod'
import { ActionState } from '~/lib/crate-safe-action'
import { CopyCard } from './schema'

export type InputType = z.infer<typeof CopyCard>
export type ReturnType = ActionState<InputType, Card>
