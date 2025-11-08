import useFinishLabTest from '@/hooks/lab/useFinishLabTest'
import { Button } from '../ui/button'
import { TestTube } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { LabTestForm } from '@/lib/schemas/lab-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldGroup } from '../ui/field'
import { Spinner } from '../ui/spinner'
import CustomField from '../shared/custom-field'
import { toast } from 'sonner'

export default function FinishLabTest({
  id,
  serviceName,
  patientName
}: {
  id: number
  serviceName: string
  patientName: string
}) {
  const { mutate, isPending } = useFinishLabTest()
  const form = useForm<z.infer<typeof LabTestForm>>({
    resolver: zodResolver(LabTestForm),
    defaultValues: {
      result: ''
    }
  })

  const onSubmit = (data: z.infer<typeof LabTestForm>) => {
    mutate(
      { id, result: data.result },
      {
        onSuccess: () => {
          toast.success(`Completed ${serviceName} for ${patientName}`)
        }
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='cursor-pointer'>
          <TestTube />
          <span>Enter Result</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalize Lab Test</DialogTitle>
          <DialogDescription>
            Provide the lab test result below. Once submitted, the test will be marked as completed.
          </DialogDescription>
        </DialogHeader>
        <form id='form-finish-lab-test' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField
              control={form.control}
              label='Result'
              name='result'
              fieldType='textarea'
              placeholder='Record the final lab result here...'
            />
          </FieldGroup>
        </form>
        <DialogFooter className='pt-2'>
          <DialogClose>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button className='cursor-pointer' form='form-finish-lab-test' disabled={isPending}>
            {isPending && <Spinner />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
