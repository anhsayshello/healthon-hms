import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import formatNumber from '@/helpers/formatNumber'

interface Props {
  title: string
  value: number
  icon: LucideIcon
  className?: string
  iconClassName?: string
  note: string
  link: string
}

const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon />
}

export default function StatCard({ title, value, icon, className, iconClassName, note, link }: Props) {
  return (
    <Card className={cn('w-full md:w-70 2xl:w-80', className)}>
      <CardHeader className='flex items-center justify-between pb-1 capitalize'>
        <h3 className='md:text-lg font-semibold'>{title}</h3>
        <Button
          variant='outline'
          asChild
          size='sm'
          className='font-normal text-xs bg-transparent p-2.5 h-0 hover:underline'
        >
          <Link to={link}> See details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4'>
          <div
            className={cn(
              'w-10 h-10 bg-violet-50/500/15 rounded-full flex items-center justify-center text-violet-600',
              iconClassName
            )}
          >
            <CardIcon icon={icon} />
          </div>
          <h2 className='text-xl 2xl:text-2xl font-semibold'>{formatNumber(value)}</h2>
        </div>
      </CardContent>
      <CardFooter className='px-6'>
        <p className='text-sm text-muted-foreground capitalize'>{note}</p>
      </CardFooter>
    </Card>
  )
}
