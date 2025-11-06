import type { AppointmentStatus, ViewType } from '@/types/appointment.type'
import { useSearchParams } from 'react-router'

export default function useAppointmentFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const view = searchParams.get('view') as ViewType
  const status = searchParams.get('status') as AppointmentStatus

  const handleViewChange = (view: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('view', view)
    setSearchParams(newParams)
  }

  const handleStatusChange = (status?: AppointmentStatus) => {
    const newParams = new URLSearchParams(searchParams)
    if (status) {
      newParams.set('status', status)
    } else {
      newParams.delete('status')
    }
    setSearchParams(newParams)
  }

  return { view, status, handleViewChange, handleStatusChange }
}
