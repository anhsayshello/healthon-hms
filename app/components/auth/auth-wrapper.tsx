import React, { type ReactNode } from 'react'

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <div className='flex flex-col w-[450px] gap-4.5 p-8 border border-foreground/10 rounded-md'>{children}</div>
}
