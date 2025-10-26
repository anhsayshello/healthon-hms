import appointmentApi from '@/apis/appointment.api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useAppointment(id: number, enabled: boolean) {
  const { data, isPending } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentApi.getAppointmentDetail(id),
    enabled
  })

  const dataAppointment = useMemo(() => data?.data.data, [data])

  return { dataAppointment, isPending }
}
