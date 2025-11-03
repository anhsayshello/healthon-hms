import staffApi from '@/apis/staff.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'

export default function useStaffs(query: string, page: string, limit: string) {
  const { isAdmin } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['staffs', { query, page, limit }],
    queryFn: () => staffApi.getStaffs({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })
  const dataStaffs = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 1
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataStaffs, currentPage, totalPages, totalRecords, isPending }
}
