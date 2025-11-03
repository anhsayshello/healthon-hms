import CustomField from '@/components/shared/custom-field'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { JOB_TYPE, WORKING_DAYS } from '@/lib/schemas'
import { DoctorFormSchema } from '@/lib/schemas/doctor-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dices, UserRoundPlus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { faker } from '@faker-js/faker'
import type z from 'zod'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import type { Weekday } from '@/types/doctor.type'
import { useDebouncedCallback } from 'use-debounce'
import useCreateDoctor from '@/hooks/useCreateDoctor'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

export default function NewDoctor() {
  const isMobile = useIsMobile()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const { mutate, isPending } = useCreateDoctor()

  const form = useForm<z.infer<typeof DoctorFormSchema>>({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      specialization: '',
      license_number: '',
      phone: '',
      address: '',
      department: '',
      photo_url: '',
      start_time: '08:00:00',
      close_time: '17:00:00'
    }
  })

  const onSubmit = (data: z.infer<typeof DoctorFormSchema>) => {
    mutate(
      { working_days: data.working_days, start_time: data.start_time, close_time: data.close_time, doctor: data },
      {
        onSuccess: () => {
          form.reset()
          toast.success(`Added Dr. ${data.email}`)
        }
      }
    )
    console.log(data)
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('email', faker.internet.email())
      form.setValue('first_name', faker.person.firstName())
      form.setValue('last_name', faker.person.lastName())
      form.setValue('specialization', faker.person.jobType())
      form.setValue('license_number', faker.string.uuid().toUpperCase())
      form.setValue('phone', `${faker.phone.number({ style: 'international' })}`)
      form.setValue('address', faker.location.streetAddress())
      form.setValue('department', faker.commerce.department())
      form.setValue('photo_url', faker.image.avatar())
      form.setValue('type', faker.helpers.arrayElements(['FULL', 'PART'])[0])
      form.setValue(
        'working_days',
        faker.helpers.arrayElements(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'], 3)
      )
      form.clearErrors()
    } catch (error) {
      console.log(error)
    } finally {
      setIsGeneratingData(false)
    }
  }, 300)

  const animatedComponents = makeAnimated()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <UserRoundPlus />
          <span>Create Doctor</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogHeader>
            <div className='flex items-center justify-between'>
              <DialogTitle>Create Doctor</DialogTitle>
              <Button
                className='cursor-pointer'
                onClick={() => {
                  setIsGeneratingData(true)
                  handleGenerateRandomData()
                }}
                disabled={isGeneratingData}
              >
                {isGeneratingData && <Spinner />}
                <span>{isGeneratingData ? 'Generating...' : 'Generate random data'}</span>
                {!isGeneratingData && <Dices />}
              </Button>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogHeader>
        <form id='form-create-doctor' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField control={form.control} label='Email' name='email' placeholder='Enter email address' />
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='First Name' name='first_name' placeholder='Enter first name' />
              <CustomField control={form.control} label='Last Name' name='last_name' placeholder='Enter last name' />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Specialization'
                name='specialization'
                placeholder='Enter specialization'
              />
              <CustomField
                control={form.control}
                label='License Number'
                name='license_number'
                placeholder='Enter license number'
              />
            </div>
            <CustomField
              control={form.control}
              label='Department'
              name='department'
              placeholder='Enter department (optional)'
              isRequired={false}
            />
            <CustomField control={form.control} label='Phone' name='phone' placeholder='Enter phone number' />
            <CustomField control={form.control} label='Address' name='address' placeholder='Enter full address' />
            <CustomField
              control={form.control}
              fieldType='select'
              label='Job Type'
              name='type'
              placeholder='Select job type'
              options={JOB_TYPE}
            />
            <div className='space-y-3'>
              <Controller
                name='working_days'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='working_days'>
                      <span>Working Days</span>
                      <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
                    </FieldLabel>
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      aria-invalid={fieldState.invalid}
                      value={WORKING_DAYS.filter((d) => field.value?.includes(d.value as Weekday))}
                      onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                      components={animatedComponents}
                      options={WORKING_DAYS}
                      styles={{
                        placeholder: (base) => ({
                          ...base,
                          fontSize: '0.875rem'
                        }),
                        option: (base) => ({
                          ...base,
                          fontSize: '0.875rem'
                        }),
                        singleValue: (base) => ({
                          ...base,
                          fontSize: '0.875rem'
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          fontSize: '0.875rem'
                        })
                      }}
                      placeholder='Select working days'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} inputType='time' label='Start Time' name='start_time' />
              <CustomField control={form.control} inputType='time' label='Close Time' name='close_time' />
            </div>

            <CustomField
              control={form.control}
              label='Avatar URL'
              name='photo_url'
              placeholder='Enter avatar URL (optional)'
              isRequired={false}
            />
          </FieldGroup>
        </form>
        <DialogFooter className='pt-2'>
          <Button variant={'outline'}>Cancel</Button>
          <Button className='cursor-pointer' form='form-create-doctor' disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
