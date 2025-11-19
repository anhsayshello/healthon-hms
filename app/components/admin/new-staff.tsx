import CustomField from '@/components/shared/custom-field'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { STAFF_ROLES } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'
import type z from 'zod'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useDebouncedCallback } from 'use-debounce'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { StaffFormSchema } from '@/lib/schemas/staff-form'
import useCreateStaff from '@/hooks/staff/useCreateStaff'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import GenerateRandomData from '@/components/shared/generate-random-data'
import { DialogTitle } from '@radix-ui/react-dialog'
import CancelButton from '../shared/cancel-button'

export default function NewStaff() {
  const isMobile = useIsMobile()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const { mutate, isPending } = useCreateStaff()

  const form = useForm<z.infer<typeof StaffFormSchema>>({
    resolver: zodResolver(StaffFormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      address: '',
      department: '',
      license_number: '',
      photo_url: ''
    }
  })

  const onSubmit = (data: z.infer<typeof StaffFormSchema>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        toast.success(`Added ${data.role.toLowerCase()} ${data.email}`)
      }
    })
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('email', faker.internet.email())
      form.setValue('first_name', faker.person.firstName())
      form.setValue('last_name', faker.person.lastName())
      form.setValue('license_number', faker.string.uuid().toUpperCase())
      form.setValue('phone', `${faker.phone.number({ style: 'international' })}`)
      form.setValue('address', faker.location.streetAddress())
      form.setValue('department', faker.commerce.department())
      form.setValue('photo_url', faker.image.avatar())
      form.setValue('role', faker.helpers.arrayElement(['ADMIN', 'NURSE', 'LAB_TECHNICIAN', 'CASHIER']))

      form.clearErrors()
    } catch (error) {
      console.log(error)
    } finally {
      setIsGeneratingData(false)
    }
  }, 300)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <UserRoundPlus />
          <span>Create Staff</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle>Create Staff</DialogTitle>
            <GenerateRandomData
              handleGenerateRandomData={handleGenerateRandomData}
              isGeneratingData={isGeneratingData}
              setIsGeneratingData={setIsGeneratingData}
            />
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form id='form-create-staff' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField control={form.control} label='Email' name='email' placeholder='Enter email address' />
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='First Name' name='first_name' placeholder='Enter first name' />
              <CustomField control={form.control} label='Last Name' name='last_name' placeholder='Enter last name' />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='Phone' name='phone' placeholder='Enter phone number' />
              <CustomField
                control={form.control}
                label='License Number'
                name='license_number'
                placeholder='Enter license number'
              />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                fieldType='select'
                label='Staff Role'
                name='role'
                placeholder='Select role'
                options={STAFF_ROLES}
              />
              <CustomField
                control={form.control}
                label='Department'
                name='department'
                placeholder='Enter department (optional)'
                isRequired={false}
              />
            </div>
            <CustomField control={form.control} label='Address' name='address' placeholder='Enter full address' />

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
          <CancelButton />
          <Button className='cursor-pointer' form='form-create-staff' disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
