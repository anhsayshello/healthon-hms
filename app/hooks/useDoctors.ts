import doctorApi from '@/apis/doctor.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from './use-role'
import type { SearchQueryParams } from '@/types/index.type'

export default function useDoctors(params: SearchQueryParams) {
  const { isAdmin, isPatient } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorApi.getDoctors(params),
    placeholderData: keepPreviousData,
    enabled: isAdmin || isPatient
  })

  const dataDoctors = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataDoctors, currentPage, totalPages, totalRecords, isPending }
}
