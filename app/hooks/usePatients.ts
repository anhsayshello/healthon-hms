import patientApi from '@/apis/patient.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'

export default function usePatients(query: string, page: string, limit: string) {
  const { isAdmin } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patients', { query, page, limit }],
    queryFn: () => patientApi.getPatients({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin
  })
  const dataPatients = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 1
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataPatients, currentPage, totalPages, totalRecords, isPending }
}
