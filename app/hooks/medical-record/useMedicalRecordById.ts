import medicalRecordApi from '@/apis/medical-record.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function useMedicalRecordById() {
  const { medicalRecordId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['medical-record', medicalRecordId],
    queryFn: () => medicalRecordApi.getMedicalRecordById(medicalRecordId as string),
    enabled: !!medicalRecordId
  })

  console.log(data)

  const dataMedicalRecord = data?.data

  return { dataMedicalRecord, isPending }
}
