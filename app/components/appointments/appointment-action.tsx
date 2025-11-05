import ViewAppointment from './view-appointment'
import { useMemo } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '../ui/separator'

import useRole from '@/hooks/use-role'
import { type Appointment } from '@/types/appointment.type'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'

import ApproveAppointment from './approve-appointment'
import CancelAppointment from './cancel-appointment'
import { EllipsisVertical } from 'lucide-react'

export default function AppointmentAction({ id, appointment }: { id: number; appointment: Appointment }) {
  const { isAdmin, isNurse, isDoctor } = useRole()
  const user = useAuthStore((state) => state.user)

  const isAssignedDoctor = useMemo(
    () => isDoctor && user?.uid === appointment.doctor_id,
    [isDoctor, user?.uid, appointment.doctor_id]
  )
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='!p-1 w-36'>
        <div className='space-y-1 text-sm'>
          <div className='py-1 px-3'>Actions</div>
          <Separator />
          <ViewAppointment id={id} />

          {(isAdmin || isNurse || isAssignedDoctor) && (
            <>
              <Separator />
              <ApproveAppointment id={id} appointment={appointment} />
            </>
          )}
          <Separator />
          <CancelAppointment id={id} appointment={appointment} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
