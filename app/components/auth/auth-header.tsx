import React from 'react'

export default function AuthHeader({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  return (
    <div className='text-center'>
      <div className='text-2xl font-medium tracking-tight'>
        {mode === 'sign-in' ? 'Welcome back' : 'Create an account'}
      </div>
      <div className='mt-1 text-sm text-muted-foreground'>
        {mode === 'sign-in'
          ? 'Enter your email to sign in to your account'
          : 'Enter your email below to create your account'}
      </div>
    </div>
  )
}
