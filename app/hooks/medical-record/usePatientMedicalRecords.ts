import medicalRecordApi from '@/apis/medical-record.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'

export default function usePatientMedicalRecords(params: SearchQueryParams) {
  const { isPatient } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['medical-records', 'patient', params],
    queryFn: () => medicalRecordApi.getPatientMedicalRecords(params),
    enabled: isPatient
  })

  return { data, isPending }
}
