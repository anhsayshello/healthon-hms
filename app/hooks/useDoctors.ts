import doctorApi from '@/apis/doctor.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import useRole from './use-role'

export default function useDoctors(query: string, page: string, limit: string) {
  const { isAdmin, isPatient } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['doctors', { query, page, limit }],
    queryFn: () => doctorApi.getDoctors({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin || isPatient
  })

  console.log(data, 'data')

  const dataDoctors = useMemo(() => data?.data.data ?? [], [data])
  const currentPage = useMemo(() => data?.data.currentPage ?? 1, [data])
  const totalPages = useMemo(() => data?.data.totalPages ?? 1, [data])
  const totalRecords = useMemo(() => data?.data.totalRecords ?? 0, [data])

  return { dataDoctors, currentPage, totalPages, totalRecords, isPending }
}
