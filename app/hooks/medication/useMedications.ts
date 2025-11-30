import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import medicationApi from '@/apis/medication.api'

export default function useMedications(params: SearchQueryParams) {
  const { isAdmin, isDoctor } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['medications', params],
    queryFn: () => medicationApi.getMedications(params),
    enabled: isDoctor || isAdmin
  })
  const dataMedications = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataMedications, currentPage, totalPages, totalRecords, isPending }
}
