import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'
import cashierApi from '@/apis/cashier.api'

export default function useAppointmentsForPayment(params: SearchQueryParams) {
  const { isCashier } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['payments', params],
    queryFn: () => cashierApi.getAppointmentsForPayment(params),
    enabled: isCashier
  })
  const dataAppointmentsForPayment = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataAppointmentsForPayment, currentPage, totalPages, totalRecords, isPending }
}
