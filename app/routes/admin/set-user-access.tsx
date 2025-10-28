import { UserCheck, UserLock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import useUpdateUserAccess from '@/hooks/useUpdateUserAccess'
import { useIsMobile } from '@/hooks/use-mobile'

export default function SetUserAccess({ uid, disabled }: { uid: string; disabled: boolean }) {
  const isMobile = useIsMobile()
  const { mutate, isPending } = useUpdateUserAccess()

  const handleDisabledChange = (checked: boolean) => {
    mutate({ uid, disabled: !checked })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full py-1 justify-start'>
          {disabled ? (
            <>
              <UserCheck />
              <span>Enable user</span>
            </>
          ) : (
            <>
              <UserLock />
              <span>Disable user</span>
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md' showCloseButton={isMobile}>
        <DialogHeader>
          <DialogTitle>{disabled ? 'Enable account' : 'Disable account'}</DialogTitle>
          <DialogDescription>
            {disabled
              ? 'Users with enabled accounts will be able to sign in again'
              : "Users with disabled accounts aren't able to sign in."}
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center space-x-3 rounded-lg border p-4'>
          <Switch
            id='user-access'
            checked={!disabled}
            onCheckedChange={handleDisabledChange}
            disabled={isPending}
            className='cursor-pointer'
          />
          <Label htmlFor='user-access' className='flex-1 cursor-pointer font-medium'>
            {disabled ? 'Enable Access' : 'Disable Access'}
          </Label>
          <div className='flex items-center gap-2 text-sm text-muted-foreground font-semibold'>
            {isPending && <Spinner />}
            {disabled ? (
              <span className='text-destructive'>Disabled</span>
            ) : (
              <span className='text-green-600'>Enabled</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
