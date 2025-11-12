import appointmentApi from '@/apis/appointment.api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useAppointmentById(id: number, enabled: boolean) {
  const { data, isPending } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentApi.getAppointmentById(id),
    enabled
  })
  const dataAppointment = useMemo(() => data?.data, [data])

  return { dataAppointment, isPending }
}
