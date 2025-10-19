import ViewAppointment from './view-appointment'
import { AlertCircle, CalendarIcon, Check, ClockIcon, EllipsisVertical, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '../ui/separator'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import appointmentApi from '@/apis/appointment.api'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import useRole from '@/hooks/use-role'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup } from '@/components/ui/field'
import { AppointmentStatusEnum, type Appointment } from '@/types/appointment.type'
import { Button } from '../ui/button'
import formatDate from '@/helpers/formatDate'
import { useAuthStore } from '@/stores/useAuthStore'
import UserInfo from './user-info'
import CustomField from './custom-field'

export default function AppointmentAction({ id, appointment }: { id: number; appointment: Appointment }) {
  const { isAdmin, isDoctor } = useRole()
  const user = useAuthStore((state) => state.user)

  const isAssignedDoctor = useMemo(
    () => isDoctor && user?.uid === appointment.doctor_id,
    [isDoctor, user?.uid, appointment.doctor_id]
  )
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='!p-1 w-36'>
        <div className='space-y-1 text-sm'>
          <div className='py-1 px-3'>Actions</div>
          <Separator />
          <ViewAppointment id={id} />
          {(isAdmin || isAssignedDoctor) && (
            <>
              <Separator />
              <Button variant='ghost' className='w-full !py-1 !justify-start'>
                <Check />
                <div>Approve</div>
              </Button>
            </>
          )}
          <Separator />
          <CancelAppointment id={id} appointment={appointment} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function CancelAppointment({ id, appointment }: { id: number; appointment: Appointment }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const formSchema = z.object({
    reason: z.string().max(300).nonempty()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointmentDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointment'] })
      toast.success('Cancel appointment successfully')
      setOpen(false)
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({ id, status: AppointmentStatusEnum.CANCELLED, reason: data.reason })
  }

  const isDisabled = useMemo(
    () =>
      appointment.status === AppointmentStatusEnum.CANCELLED || appointment.status === AppointmentStatusEnum.COMPLETED,
    [appointment.status]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full !py-1 !justify-start' disabled={isDisabled}>
          <X className='size-4 text-destructive' />
          <span className='text-destructive'>Cancel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>This action cannot be undone. Please provide a reason for cancellation.</DialogDescription>
        </DialogHeader>

        {/* Appointment Details Card */}
        <div className='rounded-lg border bg-muted/30 p-4 space-y-3'>
          <div className='flex items-start justify-between gap-3'>
            <span className='text-sm font-medium text-muted-foreground min-w-fit'>Patient:</span>
            <div className='flex-1'>
              <UserInfo
                photoUrl={appointment.patient.photo_url}
                firstName={appointment.patient.first_name}
                lastName={appointment.patient.last_name}
                description={appointment.patient.gender}
              />
            </div>
          </div>
          <Separator />
          <div className='flex items-start justify-between gap-3'>
            <span className='text-sm font-medium text-muted-foreground min-w-fit'>Doctor:</span>
            <div className='flex-1'>
              <UserInfo
                photoUrl={appointment.doctor.photo_url}
                firstName={appointment.doctor.first_name}
                lastName={appointment.doctor.last_name}
                description={appointment.doctor.specialization}
              />
            </div>
          </div>
          <Separator />
          <div className='flex items-center justify-between gap-3'>
            <span className='text-sm font-medium text-muted-foreground'>Date & Time:</span>
            <div className='flex items-center gap-1.5 text-sm font-medium'>
              <CalendarIcon className='size-4 text-muted-foreground' />
              <span>{formatDate(appointment.appointment_date)}</span>
              <span className='text-muted-foreground'>•</span>
              <ClockIcon className='size-4 text-muted-foreground' />
              <span>{appointment.time}</span>
            </div>
          </div>
        </div>

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

        {/* Warning Message */}
        <div className='flex gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3'>
          <AlertCircle className='size-5 text-destructive shrink-0 mt-0.5' />
          <div className='space-y-1'>
            <p className='text-sm font-medium text-destructive'>Important Notice</p>
            <p className='text-xs text-muted-foreground'>
              Frequent cancellations may affect your ability to book future appointments.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-3 justify-between sm:justify-end pt-2'>
          <DialogClose asChild>
            <Button variant='outline'>Keep </Button>
          </DialogClose>
          <Button variant='destructive' form='form-cancel-appointment' disabled={isPending}>
            {isPending && <Spinner />}
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
