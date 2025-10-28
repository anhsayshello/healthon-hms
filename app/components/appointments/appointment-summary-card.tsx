import { CalendarIcon, ClockIcon } from 'lucide-react'
import UserInfo from '../shared/user-info'
import { Separator } from '../ui/separator'
import { format } from 'date-fns'
import type { Appointment } from '@/types/appointment.type'

export default function AppointmentSummaryCard({ appointment }: { appointment: Appointment }) {
  return (
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
          <span>{format(appointment.appointment_date, 'yyyy-MM-dd')}</span>
          <span className='text-muted-foreground'>•</span>
          <ClockIcon className='size-4 text-muted-foreground' />
          <span>{appointment.time}</span>
        </div>
      </div>
    </div>
  )
}
