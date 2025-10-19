import { Controller, type Control } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '../ui/input'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  fieldName: string
  placeholder: string
  label: string
  type?: 'text' | 'password'
}

export default function AuthFormField({ control, fieldName, placeholder, label, type = 'text' }: Props) {
  return (
    <>
      <FieldGroup>
        <Controller
          control={control}
          name={fieldName}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              <Input
                className='text-sm placeholder:text-sm'
                {...field}
                id={field.name}
                type={type}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  )
}
