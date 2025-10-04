import type { AppointmentStatus } from '@/types/appointment.type'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

const status_color = {
  CANCELLED: 'bg-red-600/15 text-red-600',
  COMPLETED: 'bg-emerald-600/15 text-emerald-600',
  PENDING: 'bg-yellow-600/15 text-yellow-600',
  SCHEDULED: 'bg-blue-600/15 text-blue-600'
}

export default function AppointmentStatusIndicator({ status }: { status: AppointmentStatus }) {
  return (
    <Badge variant='secondary' className={cn('py-1 px-2 capitalize', status_color[status])}>
      {status.toLocaleLowerCase()}
    </Badge>
  )
}
