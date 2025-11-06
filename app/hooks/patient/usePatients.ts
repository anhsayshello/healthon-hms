import patientApi from '@/apis/patient.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useRole from '../use-role'
import type { SearchQueryParams } from '@/types/index.type'

export default function usePatients(params: SearchQueryParams) {
  const { isDoctor, isAdmin, isNurse } = useRole()

  const { data, isPending } = useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientApi.getPatients(params),
    placeholderData: keepPreviousData,
    enabled: isDoctor || isAdmin || isNurse
  })
  const dataPatients = data?.data.data ?? []
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataPatients, currentPage, totalPages, totalRecords, isPending }
}
