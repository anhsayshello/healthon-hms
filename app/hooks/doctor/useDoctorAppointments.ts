import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AppointmentParams } from '@/types/appointment.type'
import appointmentApi from '@/apis/appointment.api'

export default function useDoctorAppointments(props: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isDoctor } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['doctor', 'appointments', user?.uid, props],
    queryFn: () => appointmentApi.getDoctorAppointments(props),
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  return { data, isPending }
}
