import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useAppointmentFilter from '@/hooks/appointment/useAppointmentFilter'
import { AppointmentStatusEnum, type AppointmentStatus } from '@/types/appointment.type'

export default function AppointmentFilters() {
  const { view, status, handleStatusChange, handleViewChange } = useAppointmentFilter()

  return (
    <div className='flex items-center gap-4 w-full'>
      <Select value={status ?? ''} onValueChange={(value: AppointmentStatus) => handleStatusChange(value)}>
        <SelectTrigger className='w-full md:w-40 bg-background'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All</SelectItem>
          <SelectItem value={AppointmentStatusEnum.CONSULTATION_COMPLETED}>Consultation Completed</SelectItem>
          <SelectItem value={AppointmentStatusEnum.IN_CONSULTATION}>In Consultation</SelectItem>
          <SelectItem value={AppointmentStatusEnum.SCHEDULED}>Scheduled</SelectItem>
          <SelectItem value={AppointmentStatusEnum.PENDING}>Pending</SelectItem>
          <SelectItem value={AppointmentStatusEnum.COMPLETED}>Completed</SelectItem>
          <SelectItem value={AppointmentStatusEnum.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Select value={view ?? ''} onValueChange={(value) => handleViewChange(value)}>
        <SelectTrigger className='w-full md:w-40 bg-background'>
          <SelectValue placeholder='Time' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Time</SelectItem>
          <SelectItem value='today'>Today</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
