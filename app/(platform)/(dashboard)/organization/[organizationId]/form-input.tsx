import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface FormInputProps {
  fieldErrors?: {
    title?: string[]
  }
}

const FormInput = ({ fieldErrors }: FormInputProps) => {
  const { pending } = useFormStatus()
  return (
    <>
      <div className="flex items-center gap-4">
        <label htmlFor="title">
          <Input
            type="text"
            name="title"
            className="border"
            disabled={pending}
          />
        </label>

        <Button type="submit" size="sm" disabled={pending}>
          submit
        </Button>
      </div>

      <div className="p-2 text-red-600">
        {fieldErrors?.title?.map((t) => <p key={t}>{t}</p>)}
      </div>
    </>
  )
}

export default FormInput
