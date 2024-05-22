import { Card, List } from 'prisma/prisma-client'

export type ListWithCards = List & {
  cards: Card[]
}
