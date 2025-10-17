import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { Control } from 'react-hook-form'
import { KeyRound, MailIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

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
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupInput
                className='text-sm placeholder:text-sm'
                type={type}
                id={fieldName}
                placeholder={placeholder}
                {...field}
              />
              <InputGroupAddon>
                {fieldName === 'email' && <MailIcon />}
                {(fieldName === 'password' || fieldName === 'confirm') && <KeyRound />}
              </InputGroupAddon>
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
