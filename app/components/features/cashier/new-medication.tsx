import CustomField from '@/components/shared/custom-field'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackagePlus } from 'lucide-react'
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
import { CURRENCY, MEDICATION_UNIT_TYPES } from '@/lib/schemas'
import useCreateMedication from '@/hooks/medication/useCreateMedication'
import { MedicationForm } from '@/lib/schemas/medication-form'
import CancelButton from '../../shared/cancel-button'

export default function NewMedication() {
  const isMobile = useIsMobile()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const { mutate, isPending } = useCreateMedication()

  const form = useForm({
    resolver: zodResolver(MedicationForm),
    defaultValues: {
      medication_name: '',
      description: '',
      unit_price: '',
      manufacturer: ''
    }
  })

  const onSubmit = (data: z.infer<typeof MedicationForm>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        toast.success(`Added service ${data.medication_name}`)
      }
    })
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('medication_name', faker.word.words({ count: { min: 3, max: 6 } }))
      form.setValue('description', faker.lorem.paragraphs({ min: 2, max: 4 }))
      form.setValue('unit_price', faker.number.float({ min: 1, max: 9999, multipleOf: 0.01 }))
      form.setValue(
        'unit_type',
        faker.helpers.arrayElement(['TABLET', 'CAPSULE', 'VIAL', 'TUBE', 'BOTTLE', 'INJECTION'])
      )
      form.setValue('currency', faker.helpers.arrayElement(['VND', 'USD', 'EUR']))
      form.setValue('manufacturer', faker.company.name())
      form.setValue('stock_quantity', faker.number.int({ min: 0, max: 9999 }))

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
          <PackagePlus />
          <span>Create Medication</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <div className='flex justify-between'>
            <DialogTitle className='font-semibold'>New Medication</DialogTitle>
            <GenerateRandomData
              handleGenerateRandomData={handleGenerateRandomData}
              isGeneratingData={isGeneratingData}
              setIsGeneratingData={setIsGeneratingData}
            />
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form id='form-create-medication' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField
              control={form.control}
              label='Medication Name'
              name='medication_name'
              placeholder='Enter medication name'
            />
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Unit Price'
                name='unit_price'
                inputType='number'
                placeholder='Enter unit price'
              />
              <CustomField
                control={form.control}
                label='Currency'
                name='currency'
                fieldType='select'
                placeholder='Select currency'
                options={CURRENCY}
              />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Unit Type'
                name='unit_type'
                fieldType='select'
                placeholder='Select unit type'
                options={MEDICATION_UNIT_TYPES}
              />

              <CustomField
                control={form.control}
                label='Stock Quantity'
                placeholder='Enter stock quantity'
                name='stock_quantity'
                inputType='number'
              />
            </div>
            <CustomField
              control={form.control}
              label='Description'
              name='description'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter description'
              isRequired={false}
            />
          </FieldGroup>
        </form>
        <DialogFooter className='pt-2'>
          <CancelButton />
          <Button className='cursor-pointer' form='form-create-medication' disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
