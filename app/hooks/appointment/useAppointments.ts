import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AppointmentParams } from '@/types/appointment.type'
import appointmentApi from '@/apis/appointment.api'

export default function useAppointments(params: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isStaff } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['appointments', user?.uid, params],
    queryFn: () => appointmentApi.getAppointments(params),
    placeholderData: keepPreviousData,
    enabled: isStaff
  })

  return { data, isPending }
}
