import type { ReactNode } from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'

export default function CardWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return <Card className={cn('p-6 gap-5', className)}>{children}</Card>
}
