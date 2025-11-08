import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { LabTestStatusEnum, type LabTestStatus } from '@/types/lab.type'

const status_color = {
  CANCELLED: 'bg-red-600/15 text-red-600',
  COMPLETED: 'bg-emerald-600/15 text-emerald-600',
  PENDING: 'bg-yellow-600/15 text-yellow-600',
  IN_PROGRESS: 'bg-purple-600/15 text-purple-600'
}

export default function LabTestStatusIndicator({ status }: { status: LabTestStatus }) {
  return (
    <Badge variant='secondary' className={cn('py-1 px-2', status_color[status])}>
      {status === LabTestStatusEnum.IN_PROGRESS ? (
        <span>In progress</span>
      ) : (
        <span className='capitalize'>{status.toLocaleLowerCase()}</span>
      )}
    </Badge>
  )
}
