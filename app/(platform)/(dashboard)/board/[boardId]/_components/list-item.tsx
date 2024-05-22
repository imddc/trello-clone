'use client'

import React, { ElementRef, useRef, useState } from 'react'
import CardForm from '~/components/form/card-form'
import { cn } from '~/lib/utils'
import { ListWithCards } from '~/types'
import CardItem from './card-item'
import ListHeader from './list-header'

interface ListItemProps {
  data: ListWithCards
  index: number
}

const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
  }

  const disabledEditing = () => {
    setIsEditing(false)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader data={data} onAddCard={enableEditing} />

        <ol
          className={cn(
            'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
            data.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {data.cards.map((card) => (
            <CardItem key={card.id} data={card} />
          ))}
        </ol>

        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disabledEditing}
        />
      </div>
    </li>
  )
}

export default ListItem
