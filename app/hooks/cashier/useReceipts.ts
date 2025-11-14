import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import cashierApi from '@/apis/cashier.api'

export default function useReceipts(params: SearchQueryParams) {
  const { isCashier } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['receipts', params],
    queryFn: () => cashierApi.getReceipts(params),
    enabled: isCashier
  })
  const dataReceipts = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataReceipts, currentPage, totalPages, totalRecords, isPending }
}
