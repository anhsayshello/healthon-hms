import nurseApi from '@/apis/nurse.api'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import type { SearchQueryParams } from '@/types/index.type'

export default function useVitalSignsToday(params: SearchQueryParams) {
  const { isNurse } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['vital-signs'],
    queryFn: () => nurseApi.getVitalSignsToday(params),
    enabled: isNurse
  })

  const dataVitalSignsToday = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataVitalSignsToday, currentPage, totalPages, totalRecords, isPending }
}
