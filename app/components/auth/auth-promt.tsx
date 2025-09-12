import path from '@/constants/path'
import { Link } from 'react-router'

export function AuthPrompt({ mode }: { mode: 'signin' | 'signup' }) {
  return (
    <div className='flex items-center justify-center text-sm gap-1'>
      <span>{mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}</span>
      <Link to={mode === 'signin' ? path.signUp : path.signIn}>{mode === 'signin' ? 'Sign up' : 'Sign in'}</Link>
    </div>
  )
}
