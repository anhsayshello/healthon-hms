import patientApi from '@/apis/patient.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import { useAuthStore } from '@/stores/useAuthStore'

export default function usePatientAppointments(query: string, page: string, limit: string) {
  const user = useAuthStore((state) => state.user)
  const { isPatient } = useRole()

  const { data: dataPatientAppointments, isPending } = useQuery({
    queryKey: ['patient', 'appointment', user?.uid, { query, page, limit }],
    queryFn: () => patientApi.getPatientAppointments({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isPatient
  })

  console.log(dataPatientAppointments)

  return { dataPatientAppointments, isPendingPatientAppointments: isPatient ? isPending : false }
}
