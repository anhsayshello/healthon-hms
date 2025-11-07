import { useMemo, useState } from 'react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '../ui/spinner'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup } from '@/components/ui/field'
import { AppointmentStatusEnum, type Appointment } from '@/types/appointment.type'
import { Button } from '../ui/button'
import CustomField from '../shared/custom-field'
import { toast } from 'sonner'
import useUpdateAppointment from '@/hooks/appointment/useUpdateAppointment'
import AppointmentSummaryCard from './appointment-summary-card'
import { AlertCircle, CalendarX2 } from 'lucide-react'

export default function CancelAppointment({ id, appointment }: { id: number; appointment: Appointment }) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useUpdateAppointment()

  const formSchema = z.object({
    reason: z.string().max(300).nonempty()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(
      { id, status: AppointmentStatusEnum.CANCELLED, reason: data.reason },
      {
        onSuccess: () => {
          toast.success(`Cancelled ${appointment.patient.email} appointment`)
          setOpen(false)
        }
      }
    )
  }

  const isDisabled = useMemo(
    () =>
      appointment.status === AppointmentStatusEnum.CANCELLED || appointment.status === AppointmentStatusEnum.COMPLETED,
    [appointment.status]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full py-1 justify-start' disabled={isDisabled}>
          <CalendarX2 className='size-4 text-destructive' />
          <span className='text-destructive'>Cancel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>This action cannot be undone. Please provide a reason for cancellation.</DialogDescription>
        </DialogHeader>

        <AppointmentSummaryCard appointment={appointment} />

        <form id='form-cancel-appointment' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField
              control={form.control}
              label='Reason'
              name='reason'
              fieldType='textarea'
              placeholder='E.g., Scheduling conflict, feeling better, emergency, etc.'
            />
          </FieldGroup>
        </form>

        <Alert variant='destructive' className='bg-destructive/5 border border-destructive/20'>
          <AlertCircle />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            <p className='text-xs'>Frequent cancellations may affect your ability to book future appointments.</p>
          </AlertDescription>
        </Alert>

        <DialogFooter className='pt-2'>
          <DialogClose asChild>
            <Button variant='outline'>Keep</Button>
          </DialogClose>
          <Button variant='destructive' form='form-cancel-appointment' disabled={isPending}>
            {isPending && <Spinner />}
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
