import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { User } from 'lucide-react'

export default function EmptyDataUser() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <User />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
