import { EllipsisVertical } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { type Role, type StaffRole } from '@/types/role.type'
import { SetStaffRole } from './set-staff-role'
import SetUserAccess from './set-user-access'
import DeleteUser from './delete-user'

export default function UserAction({
  uid,
  email,
  role,
  disabled
}: {
  uid: string
  email: string
  role?: Role
  disabled?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='cursor-pointer'>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='!p-1 w-36'>
        <div className='space-y-1 text-sm'>
          <div className='py-1 px-3'>Actions</div>
          <Separator />
          {role && (
            <>
              <SetStaffRole uid={uid} staffRole={role as StaffRole} />
              <Separator />
            </>
          )}
          <SetUserAccess uid={uid} disabled={disabled} />
          <Separator />
          <DeleteUser uid={uid} email={email} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
