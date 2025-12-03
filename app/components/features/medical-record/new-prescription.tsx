import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CirclePlus } from 'lucide-react'
import { Button } from '../../ui/button'
import { Spinner } from '../../ui/spinner'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import type z from 'zod'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import type { Medication } from '@/types/medication.type'
import useMedications from '@/hooks/medication/useMedications'
import useCreatePrescription from '@/hooks/medical-record/useCreatePrescription'
import { PrescriptionFormSchema } from '@/lib/schemas/prescription-form'
import CustomField from '../../shared/custom-field'
import GenerateRandomData from '../../shared/generate-random-data'
import { useDebouncedCallback } from 'use-debounce'
import { faker } from '@faker-js/faker'
import CancelButton from '../../shared/cancel-button'

export default function NewPrescription() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<Medication>()
  const { medicalRecordId } = useParams()

  const { dataMedications, isPending: isLoadingServices } = useMedications({ limit: '1000' })
  const { mutate, isPending } = useCreatePrescription()

  const form = useForm({
    resolver: zodResolver(PrescriptionFormSchema(selectedMedication?.stock_quantity ?? 0)),
    defaultValues: {
      quantity: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }
  })

  const onSubmit = (data: z.infer<ReturnType<typeof PrescriptionFormSchema>>) => {
    if (medicalRecordId && selectedMedication?.id) {
      mutate(
        { ...data, medical_record_id: Number(medicalRecordId), medication_id: selectedMedication?.id },
        {
          onSuccess: () => {
            setOpen(false)
            toast.success(`Added prescription "${selectedMedication.medication_name}"`)
          }
        }
      )
    }
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('quantity', faker.number.int({ min: 1, max: 24 }))
      form.setValue(
        'dosage',
        faker.helpers.arrayElement([
          '1 tablet',
          '2 capsules',
          '1 vial',
          '1 tube',
          '1 bottle',
          '5ml injection',
          'apply thin layer'
        ])
      )
      form.setValue(
        'frequency',
        faker.helpers.arrayElement(['Once a day', 'Twice daily', 'Every 8 hours', 'As needed'])
      )
      form.setValue('duration', faker.helpers.arrayElement(['5 days', '7 days', '2 weeks', '1 month']))
      form.setValue('instructions', faker.lorem.sentence({ min: 6, max: 12 }))

      form.clearErrors()
    } catch (error) {
      console.log(error)
    } finally {
      setIsGeneratingData(false)
    }
  }, 300)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <CirclePlus />
          <span>Add Prescription</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='w-full md:max-w-xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex justify-between'>
            <div>
              <DialogTitle>Add Prescription</DialogTitle>
              <DialogDescription>
                Select a medication, specify dosage and usage details before submitting.
              </DialogDescription>
            </div>
            <GenerateRandomData
              handleGenerateRandomData={handleGenerateRandomData}
              isGeneratingData={isGeneratingData}
              setIsGeneratingData={setIsGeneratingData}
            />
          </div>
        </DialogHeader>
        <form id='form-request-lab-test' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='medication_id'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <span>Medication</span>
                    <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
                  </FieldLabel>

                  <Select
                    name={field.name}
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => {
                      field.onChange(value)
                      const service = dataMedications?.find((m) => String(m.id) === value)
                      setSelectedMedication(service)
                    }}
                  >
                    <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className='w-full'>
                      <SelectValue placeholder={'Select medication'} />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingServices && <Spinner />}
                      {dataMedications?.map((medication) => (
                        <SelectItem
                          onClick={() => setSelectedMedication(medication)}
                          key={medication.id}
                          value={String(medication.id)}
                        >
                          {medication.medication_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {selectedMedication && (
              <div className='flex items-start justify-between gap-6 lg:gap-8'>
                <div className='text-sm flex items-center gap-1'>
                  <FieldLabel>Stock quantity:</FieldLabel>
                  <p>
                    {selectedMedication.stock_quantity} {selectedMedication.unit_type.toLocaleLowerCase()}
                  </p>
                </div>
                <div className='text-sm flex items-center gap-1'>
                  <FieldLabel>Medication price:</FieldLabel>
                  <p>
                    {selectedMedication.unit_price} {selectedMedication.currency} /{' '}
                    {selectedMedication.unit_type.toLocaleLowerCase()}
                  </p>
                </div>
              </div>
            )}
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                label='Quantity'
                name='quantity'
                inputType='number'
                placeholder='Enter quantity'
              />
              <CustomField control={form.control} label='Dosage' name='dosage' placeholder='Enter dosage' />
            </div>
            <div className='flex items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} label='Frequency' name='frequency' placeholder='Enter frequency' />
              <CustomField control={form.control} label='Duration' name='duration' placeholder='Enter duration' />
            </div>
            <CustomField
              control={form.control}
              label='Instructions'
              name='instructions'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter instructions'
              isRequired={false}
            />
          </FieldGroup>
        </form>

        <DialogFooter className='pt-2'>
          <CancelButton />
          <Button className='cursor-pointer' form='form-request-lab-test' disabled={isPending}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
