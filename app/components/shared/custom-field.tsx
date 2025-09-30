import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { Control, ControllerRenderProps } from 'react-hook-form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '../ui/checkbox'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  isRequired?: boolean
  label?: string
  placeholder?: string
  fieldType?: 'date' | 'select'
  inputType?: string
  options?: { name: string; value: string }[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputField({ field, props }: { field: ControllerRenderProps<any, string>; props: Props }) {
  const { label, name, placeholder, inputType, fieldType, options } = props

  switch (fieldType ?? inputType) {
    case 'select':
      return (
        <Select onValueChange={field.onChange} value={field?.value}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case 'checkbox':
      return (
        <div className='flex gap-4'>
          <Checkbox id={name} onCheckedChange={(e) => field.onChange(e === true || null)} />
          <div className='space-y-2'>
            <FormLabel>
              <span>{label}</span> <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
            </FormLabel>
            <p className='text-xs text-muted-foreground'>{placeholder}</p>
          </div>
        </div>
      )
    default:
      return (
        <Input className='text-sm' disabled={name === 'email'} placeholder={placeholder} type={inputType} {...field} />
      )
  }
}

export default function CustomField(props: Props) {
  const { inputType, isRequired = true, control, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={'w-full lg:basis-1/2'}>
          {inputType !== 'checkbox' && (
            <FormLabel>
              <span>{label}</span> {isRequired && <span className='-ml-1 text-destructive text-lg leading-0'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <InputField field={field} props={props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
