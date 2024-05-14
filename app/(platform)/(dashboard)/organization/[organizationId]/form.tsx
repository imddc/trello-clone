'use client'

import React from 'react'
import { useFormState  } from 'react-dom'
import { create, type State } from '~/actions/create-board'
import FormButton from './form-button'
import FormInput from './form-input'

const OrganizationForm = () => {
  const initialState: State = { message: null, errors: {} }
  const [state, dispatch] = useFormState(create, initialState)

  return (
    <form action={dispatch}>
      <div className="flex items-center gap-4">
        <FormInput />
        <FormButton />
      </div>

      <div className="p-2 text-red-600">
        {state?.errors && state?.errors?.title?.map((t) => <p key={t}>{t}</p>)}
      </div>
    </form>
  )
}

export default OrganizationForm
