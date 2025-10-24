import type { Route } from '../auth/+types/email-verification'
import HomeBackButton from '@/components/auth/home-back-button'
import { Button } from '../../components/ui/button'
import path from '@/constants/path'
import { useNavigate } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Email Verification' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function EmailVerification() {
  const navigate = useNavigate()

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <div className='text-2xl tracking-tight font-semibold'>Check your email</div>
          <div className='mt-4 text-muted-foreground text-sm'>
            We sent a verification link to your email. Please check your inbox and click the link to verify your
            account.
          </div>
          <div className='mt-4 text-muted-foreground text-xs'>
            If you don't see the email, make sure to check your spam folder or try signing in again.
          </div>
          <Button
            variant='default'
            className='mt-6 text-sm rounded-2xl'
            onClick={() => navigate({ pathname: path.signIn })}
          >
            Back to Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
