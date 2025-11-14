import { Button } from '@/components/ui/button'
import type { Route } from './+types/notifications'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Bell, RefreshCcwIcon } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Notifications' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Notifications() {
  return (
    <div className='-mt-10 grow h-full flex items-center justify-center'>
      <Empty className='from-muted/50 to-background h-full bg-gradient-to-b from-30%'>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <Bell />
          </EmptyMedia>
          <EmptyTitle>No Notifications</EmptyTitle>
          <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant='outline' size='sm'>
            <RefreshCcwIcon />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
