import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Diagnosis } from '@/types/medical-record.type'
import DeleteDiagnosis from './delete-diagnosis'
import useUpdateDiagnosis from '@/hooks/medical-record/useUpdateDiagnosis'
import { DiagnosisFormSchema } from '@/lib/schemas/diagnosis-form'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import CustomField from '@/components/shared/custom-field'
import { FieldGroup } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Calendar, ClipboardList, Notebook, SquarePen, Stethoscope } from 'lucide-react'
import formatDate from '@/helpers/formatDate'

export default function DiagnosisCard({ diagnosis, isModify }: { diagnosis: Diagnosis; isModify: boolean }) {
  const [isUpdate, setIsUpdate] = useState(false)
  const { mutate, isPending } = useUpdateDiagnosis()

  const form = useForm<z.infer<typeof DiagnosisFormSchema>>({
    resolver: zodResolver(DiagnosisFormSchema),
    defaultValues: {
      symptoms: diagnosis.symptoms,
      diagnosis: diagnosis.diagnosis,
      notes: diagnosis.notes,
      follow_up_plan: diagnosis.follow_up_plan
    }
  })

  const onSubmit = (data: z.infer<typeof DiagnosisFormSchema>) => {
    mutate(
      { id: diagnosis.id, props: data },
      {
        onSuccess: () => {
          form.reset()
          toast.success(`Updated successfully`)
          setIsUpdate(false)
        }
      }
    )
  }

  return (
    <Card>
      <CardHeader className='gap-1'>
        <CardTitle className='flex items-center gap-2 overflow-hidden'>
          <Stethoscope size={14} />
          <h3 className='font-semibold leading-tight truncate'>{diagnosis.diagnosis}</h3>
        </CardTitle>
        <CardDescription className='shrink-0 flex gap-1.5 text-xs text-muted-foreground'>
          <Calendar size={12} />
          <span>{formatDate(diagnosis.created_at)}</span>
        </CardDescription>
        {isModify && (
          <CardAction className='space-x-3 space-y-2'>
            {!isUpdate && (
              <Button variant={'secondary'} onClick={() => setIsUpdate(true)}>
                <SquarePen />
                <span>Edit</span>
              </Button>
            )}
            <DeleteDiagnosis id={diagnosis.id} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {!isUpdate && (
          <div className='space-y-2'>
            <div className='space-y-1'>
              <div className='flex items-center gap-1.5'>
                <div className='mx-1 h-1 w-1 rounded-full bg-red-500' />
                <span className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Symptoms</span>
              </div>
              <p className='text-sm pl-5 leading-relaxed'>{diagnosis.symptoms}</p>
            </div>

            {diagnosis.notes && (
              <div className='space-y-1 pt-2 border-t'>
                <div className='flex gap-1.5'>
                  <Notebook size={14} className='text-muted-foreground' />
                  <span className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Notes</span>
                </div>
                <p className='text-sm pl-5 text-muted-foreground leading-relaxed'>{diagnosis.notes}</p>
              </div>
            )}

            {diagnosis.follow_up_plan && (
              <div className='space-y-1 pt-2 border-t'>
                <div className='flex gap-1.5'>
                  <ClipboardList size={14} className='text-muted-foreground' />
                  <span className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                    Follow-up Plan
                  </span>
                </div>
                <p className='text-sm pl-5 text-muted-foreground leading-relaxed'>{diagnosis.follow_up_plan}</p>
              </div>
            )}
          </div>
        )}
        {isUpdate && (
          <form id='form-update-diagnosis' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
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
              </div>
              <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-8'>
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
              </div>
            </FieldGroup>
          </form>
        )}
      </CardContent>
      {isUpdate && (
        <CardFooter className='flex items-center gap-3 justify-end'>
          <Button variant={'outline'} onClick={() => setIsUpdate(false)}>
            Cancel
          </Button>
          <Button className='cursor-pointer' form='form-update-diagnosis' disabled={isPending}>
            {isPending && <Spinner />}
            Update
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
