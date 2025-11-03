import patientApi from '@/apis/patient.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { useQuery } from '@tanstack/react-query'

export default function usePatientProfile() {
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)

  const { data } = useQuery({
    queryKey: ['patient', 'information', user?.uid],
    queryFn: () => patientApi.getPatientInformation(),
    enabled: Boolean(role),
    staleTime: Infinity
  })

  const dataPatient = data?.data.data

  return { dataPatient }
}
