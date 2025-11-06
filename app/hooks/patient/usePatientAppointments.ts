import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AppointmentParams } from '@/types/appointment.type'
import appointmentApi from '@/apis/appointment.api'

export default function usePatientAppointments(params: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isPatient } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patient', 'appointments', user?.uid, params],
    queryFn: () => appointmentApi.getPatientAppointments(params),
    placeholderData: keepPreviousData,
    enabled: isPatient
  })

  return { data, isPending }
}
