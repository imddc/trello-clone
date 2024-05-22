'use client'

import { List } from 'prisma/prisma-client'
import React, { ElementRef, useRef, useState } from 'react'
import CardForm from '~/components/form/card-form'
import ListHeader from './list-header'

interface ListItemProps {
  data: List
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
