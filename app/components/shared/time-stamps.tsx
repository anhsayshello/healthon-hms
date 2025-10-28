import { format } from 'date-fns'

export default function Timestamps({ createdAt, updatedAt }: { createdAt: string; updatedAt: string }) {
  return (
    <div className='flex justify-between text-xs text-muted-foreground'>
      <span>Created: {format(new Date(createdAt), 'yyyy-MM-dd hh:mm a')}</span>
      <span>Updated: {format(new Date(updatedAt), 'yyyy-MM-dd hh:mm a')}</span>
    </div>
  )
}
