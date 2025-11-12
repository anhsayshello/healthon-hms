import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function VitalCard({
  icon: Icon,
  label,
  value,
  unit
}: {
  icon: LucideIcon
  label: string
  value: number | string
  unit: string
}) {
  return (
    <Card className='gap-3 hover:shadow-md transition-shadow'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icon />
          <span>{label}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center gap-2'>
        <div className='text-lg font-bold'>{value}</div>
        <div className='text-sm'>{unit}</div>
      </CardContent>
    </Card>
  )
}
