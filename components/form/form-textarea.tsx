import React, { forwardRef, KeyboardEventHandler } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '~/lib/utils'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import FormErrors from './form-error'

interface FormTextareaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[]> | undefined
  className?: string
  onBlur?: () => void
  onClick?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  defaultValue?: string
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            className={cn(
              'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              className
            )}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

export default FormTextarea
