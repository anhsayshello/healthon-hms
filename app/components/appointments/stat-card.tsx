import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  value: number
  icon: LucideIcon
  className?: string
  iconClassName?: string
  note: string
}

const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon size={20} />
}

export default function StatCard({ title, value, icon, className }: Props) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='flex items-center justify-between capitalize'>
        <div className='tracking-tight font-medium text-sm'>{title}</div>
        <CardIcon icon={icon} />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-semibold'>{value}</div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
