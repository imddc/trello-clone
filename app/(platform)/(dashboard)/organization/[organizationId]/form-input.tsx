import React from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '~/components/ui/input'

const FormInput = () => {
  const { pending } = useFormStatus()
  return (
    <label htmlFor="title">
      <Input type="text" name="title" className="border" disabled={pending} />
    </label>
  )
}

export default FormInput
