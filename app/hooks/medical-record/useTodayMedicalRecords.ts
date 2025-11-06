import medicalRecordApi from '@/apis/medical-record.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../use-role'

export default function useTodayMedicalRecords(params: SearchQueryParams) {
  const { isDoctor } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['medical-records', 'today', params],
    queryFn: () => medicalRecordApi.getTodayMedicalRecords(params),
    enabled: isDoctor
  })

  return { data, isPending }
}
