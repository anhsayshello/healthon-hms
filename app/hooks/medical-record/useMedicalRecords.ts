import medicalRecordApi from '@/apis/medical-record.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'

export default function useMedicalRecords(params: SearchQueryParams) {
  const { isDoctor, isPatient } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['medical-records', params],
    queryFn: () => medicalRecordApi.getMedicalRecords(params),
    enabled: !isDoctor && !isPatient
  })

  return { data, isPending }
}
