import staffApi from '@/apis/staff.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import useRole from './use-role'

export default function useStaffs(query: string, page: string, limit: string) {
  const { isAdmin } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['staffs', { query, page, limit }],
    queryFn: () => staffApi.getStaffs({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })
  const dataStaffs = useMemo(() => data?.data.data ?? [], [data])
  const currentPage = useMemo(() => data?.data.currentPage ?? 1, [data])
  const totalPages = useMemo(() => data?.data.totalPages ?? 1, [data])
  const totalRecords = useMemo(() => data?.data.totalRecords ?? 0, [data])

  return { dataStaffs, currentPage, totalPages, totalRecords, isPending }
}
