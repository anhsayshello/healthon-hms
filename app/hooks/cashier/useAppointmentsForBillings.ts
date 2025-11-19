import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import cashierApi from '@/apis/cashier.api'

export default function useAppointmentsForPayment(params: SearchQueryParams) {
  const { isCashier } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['billings', params],
    queryFn: () => cashierApi.getAppointmentsForBilling(params),
    enabled: isCashier
  })
  const dataAppointmentsForBilling = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataAppointmentsForBilling, currentPage, totalPages, totalRecords, isPending }
}
