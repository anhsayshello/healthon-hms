import type { Route } from '../auth/+types/email-link-sent'
import HomeBackButton from '@/components/auth/home-back-button'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router'
import path from '@/constants/path'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Email Sent' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function EmailLinkSent() {
  const navigate = useNavigate()

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <div className='text-2xl tracking-tight font-semibold'>Check your email</div>
          <div className='mt-4 text-muted-foreground text-sm'>
            We sent you a login link. Be sure to check your spam too.
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
