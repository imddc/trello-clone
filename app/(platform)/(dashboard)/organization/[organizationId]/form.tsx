'use client'

import React from 'react'
import { createBoard } from '~/actions/create-board'
import { useAction } from '~/hooks/useAction'
import FormInput from './form-input'

const OrganizationForm = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onError(error) {
      console.log(error)
    },
    onSuccess(data) {
      console.log(data)
    }
  })
  const onSubmit = (forData: FormData) => {
    execute({ title: forData.get('title') as string })
  }

  return (
    <form action={onSubmit}>
      <FormInput fieldErrors={fieldErrors} />
    </form>
  )
}

export default OrganizationForm
