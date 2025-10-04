import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export default function CardWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('bg-primary-foreground rounded-lg ring-1 ring-accent p-6', className)}>{children}</div>
}
