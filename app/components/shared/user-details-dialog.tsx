import type { Doctor } from '@/types/doctor.type'
import type { Patient } from '@/types/patient.type'
import type { Staff } from '@/types/staff.type'
import { useIsMobile } from '@/hooks/use-mobile'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/components/shared/profile-avatar'
import type { Role } from '@/types/role.type'
import { Separator } from '@/components/ui/separator'
import Timestamps from '@/components/shared/time-stamps'
import type { ReactNode } from 'react'
import EmptyDataUser from './empty-data-user'

interface Props {
  isPending?: boolean
  user: Patient | Doctor | Staff
  role: Role
  children: ReactNode
}

export default function UserDetailsDialog({ isPending, user, role, children }: Props) {
  const isMobile = useIsMobile()

  return (
    <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto' showCloseButton={isMobile}>
      {isPending && (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      {!isPending && !user && <EmptyDataUser />}
      {!isPending && user && (
        <>
          <DialogHeader>
            <DialogTitle className='text-xl capitalize'>{role?.toLowerCase()} Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className='space-y-6 mt-4'>
            {/* Profile Section */}
            <div className='flex items-start gap-5'>
              <div className='relative'>
                <Avatar className={'w-20 h-20 border-2 border-primary'}>
                  <AvatarImage src={user?.photo_url} />
                  <AvatarFallback>{getInitials(user?.last_name ?? '')}</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-1 space-y-0.5'>
                <h3 className='text-xl font-semibold'>
                  {user?.first_name} {user?.last_name}
                </h3>
                {/* <p className='text-sm text-muted-foreground'>{description}</p> */}
                <p className='text-sm text-muted-foreground'>{user?.email}</p>
              </div>
            </div>
            {/* <Button variant={'link'} onClick={() => navigate({ pathname: `/profile/${user.uid}` })}>
              go to profile
            </Button> */}
            <Separator />

            {/* Basic Information */}
            <h4 className='font-semibold mb-3 text-lg'>Basic Information</h4>
            {children}

            {/* Timestamps */}
            <Separator />
            <Timestamps createdAt={user?.created_at ?? ''} updatedAt={user?.updated_at ?? ''} />
          </div>
        </>
      )}
    </DialogContent>
  )
}
