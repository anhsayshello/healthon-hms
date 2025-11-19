import CustomField from '@/components/shared/custom-field'
import GenerateRandomData from '@/components/shared/generate-random-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { useIsMobile } from '@/hooks/use-mobile'
import useCreatVitalSigns from '@/hooks/nurse/useCreateVitalSigns'
import { VitalSignsSchema } from '@/lib/schemas/vital-signs-form'
import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { HeartPlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import type z from 'zod'
import CancelButton from '@/components/shared/cancel-button'

interface Props {
  appointment_id: number
  patientFirstName: string
  patientLastName: string
}

export default function NewVitalSigns({ appointment_id, patientFirstName, patientLastName }: Props) {
  const isMobile = useIsMobile()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useCreatVitalSigns()

  const form = useForm({
    resolver: zodResolver(VitalSignsSchema)
  })

  const onSubmit = (data: z.infer<typeof VitalSignsSchema>) => {
    mutate(
      { appointment_id, props: data },
      {
        onSuccess: () => {
          setOpen(false)
          toast.success(`Added ${patientFirstName} ${patientLastName} Vital Signs`)
        }
      }
    )
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('body_temperature', faker.number.float({ min: 30, max: 45, fractionDigits: 1 }))
      form.setValue('systolic', faker.number.int({ min: 50, max: 250 }))
      form.setValue('diastolic', faker.number.int({ min: 30, max: 150 }))
      form.setValue('heart_rate', faker.number.int({ min: 30, max: 250 }))
      form.setValue('respiratory_rate', faker.number.int({ min: 5, max: 60 }))
      form.setValue('oxygen_saturation', faker.number.int({ min: 50, max: 100 }))
      form.setValue('weight', faker.number.float({ min: 1, max: 500, fractionDigits: 1 }))
      form.setValue('height', faker.number.float({ min: 30, max: 250, fractionDigits: 1 }))

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
        <Button>
          <HeartPlus />
          <span>Take Vital Signs</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile}>
        <DialogHeader>
          <div className='flex justify-between'>
            <div className='space-y-1'>
              <DialogTitle>Add Vital Signs</DialogTitle>
              <DialogDescription>Patient: {patientFirstName + ' ' + patientLastName}</DialogDescription>
            </div>
            <GenerateRandomData
              handleGenerateRandomData={handleGenerateRandomData}
              isGeneratingData={isGeneratingData}
              setIsGeneratingData={setIsGeneratingData}
            />
          </div>
        </DialogHeader>
        <form id='form-add-vital-signs' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                name='body_temperature'
                label='Body Temperature (°C)'
                placeholder='Normal: 36-37.5°C'
              />
              <CustomField
                control={form.control}
                name='heart_rate'
                label='Heart Rate (bpm)'
                placeholder='Normal: 60-100 bpm'
              />
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                name='systolic'
                label='Systolic (mmHg)'
                placeholder='Normal: 90-120 mmHg'
              />
              <CustomField
                control={form.control}
                name='diastolic'
                label='Diastolic (mmHg)'
                placeholder='Normal: 60-80 mmHg'
              />
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField
                control={form.control}
                name='respiratory_rate'
                label='Respiratory Rate (/min)'
                placeholder='Normal: 12-20 /min'
                isRequired={false}
              />
              <CustomField
                control={form.control}
                name='oxygen_saturation'
                label='SpO2 (%)'
                placeholder='Normal: ≥95%'
                isRequired={false}
              />
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
              <CustomField control={form.control} name='weight' label='Weight (kg)' />
              <CustomField control={form.control} name='height' label='Height (cm)' />
            </div>
          </FieldGroup>
        </form>
        <DialogFooter className='mt-2'>
          <CancelButton />
          <Button form='form-add-vital-signs' disabled={isPending}>
            {isPending && <Spinner />}
            <span>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
