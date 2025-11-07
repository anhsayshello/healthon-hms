import CustomField from '@/components/shared/custom-field'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus } from 'lucide-react'
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
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import GenerateRandomData from '@/components/shared/generate-random-data'
import { DialogTitle } from '@radix-ui/react-dialog'
import useCreateLabService from '@/hooks/lab/useCreateLabService'
import { LabServiceForm } from '@/lib/schemas/lab-form'
import { CURRENCY } from '@/lib/schemas'

export default function NewLabService() {
  const isMobile = useIsMobile()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const { mutate, isPending } = useCreateLabService()

  const form = useForm({
    resolver: zodResolver(LabServiceForm),
    defaultValues: {
      service_name: '',
      description: '',
      currency: 'VND'
    }
  })

  const onSubmit = (data: z.infer<typeof LabServiceForm>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        toast.success(`Added service ${data.service_name}`)
      }
    })
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('service_name', faker.lorem.sentence({ min: 3, max: 8 }))
      form.setValue('price', faker.number.int({ min: 10, max: 9999999 }))
      form.setValue('description', faker.lorem.paragraphs({ min: 1, max: 3 }))
      form.setValue('currency', faker.helpers.arrayElement(['VND', 'USD', 'EUR']))

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
          <CirclePlus />
          <span>Create Lab Service</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle>New Lab Service</DialogTitle>
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
            <CustomField control={form.control} label='Name' name='service_name' placeholder='Enter service name' />
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Price'
                name='price'
                inputType='number'
                placeholder='Enter price'
              />
              <CustomField
                control={form.control}
                label='Currency'
                name='currency'
                fieldType='select'
                options={CURRENCY}
              />
            </div>
            <CustomField
              control={form.control}
              label='Description'
              name='description'
              fieldType='textarea'
              placeholder='Enter description'
            />
          </FieldGroup>
        </form>
        <DialogFooter className='pt-2'>
          <Button variant={'outline'}>Cancel</Button>
          <Button className='cursor-pointer' form='form-create-staff' disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
