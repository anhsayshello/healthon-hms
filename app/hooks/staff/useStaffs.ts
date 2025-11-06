import staffApi from '@/apis/staff.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../use-role'
import type { SearchQueryParams } from '@/types/index.type'

export default function useStaffs(params: SearchQueryParams) {
  const { isAdmin, isDoctor } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['staffs', params],
    queryFn: () => staffApi.getStaffs(params),
    placeholderData: keepPreviousData,
    enabled: isAdmin || isDoctor
  })
  const dataStaffs = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataStaffs, currentPage, totalPages, totalRecords, isPending }
}
