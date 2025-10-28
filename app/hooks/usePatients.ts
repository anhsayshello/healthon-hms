import patientApi from '@/apis/patient.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import useRole from './use-role'

export default function usePatients(query: string, page: string, limit: string) {
  const { isAdmin } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patients', { query, page, limit }],
    queryFn: () => patientApi.getPatients({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })
  const dataPatients = useMemo(() => data?.data.data ?? [], [data])
  const currentPage = useMemo(() => data?.data.currentPage ?? 1, [data])
  const totalPages = useMemo(() => data?.data.totalPages ?? 1, [data])
  const totalRecords = useMemo(() => data?.data.totalRecords ?? 0, [data])

  return { dataPatients, currentPage, totalPages, totalRecords, isPending }
}
