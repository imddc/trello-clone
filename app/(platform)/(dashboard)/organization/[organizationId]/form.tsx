'use client'

import React from 'react'
import { createBoard } from '~/actions/create-board'
import FormInput from '~/components/form/form-input'
import { Button } from '~/components/ui/button'
import { useAction } from '~/hooks/useAction'

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
      <div className="flex flex-col space-y-2">
        <FormInput label="title" id="title" errors={fieldErrors} />
      </div>
    </form>
  )
}

export default OrganizationForm
