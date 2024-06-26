'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '~/lib/utils'
import { Button } from '../ui/button'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn(className)}
      variant={variant}
      size="sm"
    >
      {children}
    </Button>
  )
}

export default FormSubmit
