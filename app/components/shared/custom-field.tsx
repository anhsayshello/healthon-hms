import { Controller, type Control, type ControllerFieldState, type ControllerRenderProps } from 'react-hook-form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '../ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import type { HTMLInputTypeAttribute } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '../ui/input-group'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  isRequired?: boolean
  label?: string
  placeholder?: string
  fieldType?: 'date' | 'select' | 'textarea'
  inputType?: HTMLInputTypeAttribute
  options?: { name: string; value: string }[]
}

function InputField({
  field,
  fieldState,
  props
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>
  props: Props
  fieldState: ControllerFieldState
}) {
  const { label, name, placeholder, inputType, fieldType, options } = props

  switch (fieldType ?? inputType) {
    case 'date':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
            >
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
              aria-invalid={fieldState.invalid}
              captionLayout='dropdown'
            />
          </PopoverContent>
        </Popover>
      )
    case 'select':
      return (
        <Select name={field.name} value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className='w-full'>
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
          <Checkbox
            id={name}
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
          <div className='space-y-2'>
            <FieldLabel htmlFor={field.name}>
              <span>{label}</span> <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
            </FieldLabel>
            <p className='text-xs text-muted-foreground'>{placeholder}</p>
          </div>
        </div>
      )
    case 'textarea':
      return (
        <InputGroup>
          <InputGroupTextarea
            {...field}
            id={field.name}
            placeholder={placeholder}
            rows={6}
            className='min-h-24 max-h-36 resize-none text-sm wrap-anywhere'
            aria-invalid={fieldState.invalid}
          />
          <InputGroupAddon align='block-end'>
            <InputGroupText className='tabular-nums'>{field.value.length}/300 characters</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      )

    default:
      return (
        <Input
          className={cn('text-sm', {
            'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none':
              inputType === 'time'
          })}
          step='1'
          disabled={name === 'email'}
          placeholder={placeholder}
          type={inputType}
          id={field.name}
          {...field}
          aria-invalid={fieldState.invalid}
        />
      )
  }
}

export default function CustomField(props: Props) {
  const { inputType, isRequired = true, control, name, label } = props
  return (
    <>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className={'w-full lg:basis-1/2'}>
              {inputType !== 'checkbox' && (
                <FieldLabel htmlFor={field.name}>
                  <span>{label}</span>
                  {isRequired && <span className='-ml-1 text-destructive text-lg leading-0'>*</span>}
                </FieldLabel>
              )}
              <InputField field={field} props={props} fieldState={fieldState} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  )
}
