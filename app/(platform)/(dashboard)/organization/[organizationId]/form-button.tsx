import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '~/components/ui/button'

const FormButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending}>
      submit
    </Button>
  )
}

export default FormButton
