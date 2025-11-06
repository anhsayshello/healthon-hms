import labApi from '@/apis/lab.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'

export default function useLabServices(params: SearchQueryParams) {
  const { data, isPending } = useQuery({
    queryKey: ['lab', 'services', params],
    queryFn: () => labApi.getLabServices(params)
  })
  const dataLabServices = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataLabServices, currentPage, totalPages, totalRecords, isPending }
}
