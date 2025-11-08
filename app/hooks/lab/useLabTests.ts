import labApi from '@/apis/lab.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'

export default function useLabTests(params: SearchQueryParams) {
  const { data, isPending } = useQuery({
    queryKey: ['lab', 'tests', params],
    queryFn: () => labApi.getLabTests(params)
  })

  console.log(data)
  const dataLabTests = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataLabTests, currentPage, totalPages, totalRecords, isPending }
}
