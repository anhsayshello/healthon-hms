import path from '@/constants/path'
import { Link } from 'react-router'

export function AuthSwitch({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  return (
    <div className='flex items-center justify-center text-sm gap-1'>
      <span className='text-muted-foreground'>
        {mode === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
      </span>
      <Link to={mode === 'sign-in' ? path.signUp : path.signIn}>{mode === 'sign-in' ? 'Sign up' : 'Sign in'}</Link>
    </div>
  )
}
