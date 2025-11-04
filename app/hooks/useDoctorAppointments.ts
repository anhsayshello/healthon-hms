import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import doctorApi from '@/apis/doctor.api'
import type { AppointmentParams } from '@/types/appointment.type'

export default function useDoctorAppointments(props: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isDoctor } = useRole()

  const { data: dataDoctorAppointments, isPending } = useQuery({
    queryKey: ['doctor', 'appointment', user?.uid, props],
    queryFn: () => doctorApi.getDoctorAppointments(props),
    placeholderData: keepPreviousData,
    enabled: isDoctor
  })

  const isPendingDoctorAppointments = isDoctor ? isPending : false

  return { dataDoctorAppointments, isPendingDoctorAppointments }
}
