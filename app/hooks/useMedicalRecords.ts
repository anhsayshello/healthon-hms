import medicalRecordApi from '@/apis/medical-record.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'

export default function useMedicalRecord(params: SearchQueryParams) {
  const { data, isPending } = useQuery({
    queryKey: ['medical-records', params],
    queryFn: () => medicalRecordApi.getMedicalRecords(params)
  })
  const dataMedicalRecords = data?.data.data
  const currentPage = data?.data.currentPage ?? 1
  const totalPages = data?.data.totalPages ?? 0
  const totalRecords = data?.data.totalRecords ?? 0

  return { dataMedicalRecords, currentPage, totalPages, totalRecords, isPending }
}
