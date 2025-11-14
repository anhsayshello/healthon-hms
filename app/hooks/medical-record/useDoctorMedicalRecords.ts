import medicalRecordApi from '@/apis/medical-record.api'
import type { SearchQueryParams } from '@/types/index.type'
import { useQuery } from '@tanstack/react-query'
import useRole from '../useRole'

export default function useDoctorMedicalRecords(params: SearchQueryParams) {
  const { isDoctor } = useRole()
  const { data, isPending } = useQuery({
    queryKey: ['medical-records', 'doctor', params],
    queryFn: () => medicalRecordApi.getDoctorMedicalRecords(params),
    enabled: isDoctor
  })

  return { data, isPending }
}
