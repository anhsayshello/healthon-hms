import patientApi from '@/apis/patient.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AppointmentParams } from '@/types/appointment.type'

export default function usePatientAppointments(params: AppointmentParams) {
  const user = useAuthStore((state) => state.user)
  const { isPatient } = useRole()

  const { data: dataPatientAppointments, isPending } = useQuery({
    queryKey: ['patient', 'appointment', user?.uid, params],
    queryFn: () => patientApi.getPatientAppointments(params),
    placeholderData: keepPreviousData,
    enabled: isPatient
  })

  const isPendingPatientAppointments = isPatient ? isPending : false

  return { dataPatientAppointments, isPendingPatientAppointments }
}
