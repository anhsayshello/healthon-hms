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
import { DiagnosisFormSchema } from '@/lib/schemas/diagnosis-form'
import useCreateDiagnosis from '@/hooks/medical-record/useCreateDiagnosis'
import { useParams } from 'react-router'
import CancelButton from '../../shared/cancel-button'

export default function NewDiagnosis() {
  const isMobile = useIsMobile()
  const { medicalRecordId } = useParams()
  const [isGeneratingData, setIsGeneratingData] = useState(false)
  const { mutate, isPending } = useCreateDiagnosis()

  const form = useForm<z.infer<typeof DiagnosisFormSchema>>({
    resolver: zodResolver(DiagnosisFormSchema),
    defaultValues: {
      symptoms: '',
      diagnosis: '',
      notes: '',
      follow_up_plan: ''
    }
  })

  const onSubmit = (data: z.infer<typeof DiagnosisFormSchema>) => {
    mutate(
      { ...data, medical_record_id: Number(medicalRecordId) },
      {
        onSuccess: () => {
          form.reset()
          toast.success(`Added diagnosis ${data.diagnosis}`)
        }
      }
    )
  }

  const handleGenerateRandomData = useDebouncedCallback(() => {
    try {
      form.setValue('symptoms', faker.lorem.sentence({ min: 3, max: 10 }))
      form.setValue('diagnosis', faker.lorem.sentence({ min: 3, max: 10 }))
      form.setValue('notes', faker.lorem.paragraph({ min: 1, max: 3 }))
      form.setValue('follow_up_plan', faker.lorem.paragraph({ min: 2, max: 3 }))

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
          <span>Create Diagnosis</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <div className='flex justify-between'>
            <DialogTitle className='font-semibold'>New Diagnosis</DialogTitle>
            <GenerateRandomData
              handleGenerateRandomData={handleGenerateRandomData}
              isGeneratingData={isGeneratingData}
              setIsGeneratingData={setIsGeneratingData}
            />
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form id='form-create-diagnosis' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField
              control={form.control}
              label='Symptoms'
              name='symptoms'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter symptoms'
            />
            <CustomField
              control={form.control}
              label='Diagnosis'
              name='diagnosis'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter diagnosis'
            />
            <CustomField
              control={form.control}
              label='Notes'
              name='notes'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter notes'
              isRequired={false}
            />
            <CustomField
              control={form.control}
              label='Follow-up plan'
              name='follow_up_plan'
              fieldType='textarea'
              maxCharacters={500}
              placeholder='Enter follow up plan'
              isRequired={false}
            />
          </FieldGroup>
        </form>
        <DialogFooter className='pt-2'>
          <CancelButton />
          <Button className='cursor-pointer' form='form-create-diagnosis' disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
