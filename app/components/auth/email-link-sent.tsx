import { Button } from '../ui/button'

export default function EmailLinkSent({ onClick }: { onClick: () => void }) {
  return (
    <div className='text-center'>
      <div className='text-2xl tracking-tight font-semibold'>Check your email</div>
      <div className='mt-4 text-muted-foreground text-sm'>
        We sent you a login link. Be sure to check your spam too.
      </div>
      <div className='mt-4 text-muted-foreground text-xs'>
        If you don't see the email, make sure to check your spam folder or try signing in again.
      </div>
      <Button variant='default' className='mt-6 text-sm rounded-2xl' onClick={onClick}>
        Back to Sign in
      </Button>
    </div>
  )
}
