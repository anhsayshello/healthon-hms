import labApi from '@/apis/lab.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'

export default function useLabTestRequests(params: SearchQueryParams) {
  const { data, isPending } = useQuery({
    queryKey: ['lab', 'requests', params],
    queryFn: () => labApi.getLabTestRequests(params)
  })

  const dataLabTestRequests = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataLabTestRequests, currentPage, totalPages, totalRecords, isPending }
}
