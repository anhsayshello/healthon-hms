import appointmentApi from '@/apis/appointment.api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useAppointmentDetail(id: number, enabled: boolean) {
  const { data, isPending } = useQuery({
    queryKey: ['appointment', 'detail', id],
    queryFn: () => appointmentApi.getAppointmentDetail(id),
    enabled
  })
  console.log(data)
  const dataAppointment = useMemo(() => data?.data, [data])

  return { dataAppointment, isPending }
}
