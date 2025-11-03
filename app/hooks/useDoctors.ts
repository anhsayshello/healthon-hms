import doctorApi from '@/apis/doctor.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'

export default function useDoctors(query: string, page: string, limit: string) {
  const { isAdmin, isPatient } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['doctors', { query, page, limit }],
    queryFn: () => doctorApi.getDoctors({ query, page, limit }),
    placeholderData: keepPreviousData,
    enabled: isAdmin || isPatient
  })

  const dataDoctors = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 1
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataDoctors, currentPage, totalPages, totalRecords, isPending }
}
