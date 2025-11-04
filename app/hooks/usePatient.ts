import patientApi from '@/apis/patient.api'
import { useQuery } from '@tanstack/react-query'

export default function usePatient(uid: string) {
  const { data, isPending } = useQuery({
    queryKey: ['patient', uid],
    queryFn: () => patientApi.getPatientById(uid),
    enabled: !!uid
  })

  const dataPatient = data?.data

  return { dataPatient, isPending }
}
