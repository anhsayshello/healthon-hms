import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
import { CalendarCheck2 } from 'lucide-react'
import CancelButton from '../shared/cancel-button'

export default function ApproveAppointment({ id, appointment }: { id: number; appointment: Appointment }) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useUpdateAppointment()

  const formSchema = z.object({
    note: z.string().max(300).optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(
      { id, status: AppointmentStatusEnum.SCHEDULED, note: data.note },
      {
        onSuccess: () => {
          toast.success(`Approved ${appointment.patient.email} appointment`)
          setOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full py-1 justify-start'
          disabled={appointment.status !== AppointmentStatusEnum.PENDING}
        >
          <CalendarCheck2 />
          <div>Approve</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Appointment</DialogTitle>
          <DialogDescription>
            This action will confirm the appointment. The patient and doctor will be notified about the confirmation.
          </DialogDescription>
        </DialogHeader>
        <AppointmentSummaryCard appointment={appointment} />

        <form id='form-approve-appointment' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <CustomField
              control={form.control}
              label='Note'
              name='note'
              fieldType='textarea'
              isRequired={false}
              placeholder='E.g., Bring medical records, fasting required, follow-up appointment, etc.'
            />
          </FieldGroup>
        </form>

        <DialogFooter className='pt-2'>
          <CancelButton />
          <Button form='form-approve-appointment' className='cursor-pointer' disabled={isPending}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
