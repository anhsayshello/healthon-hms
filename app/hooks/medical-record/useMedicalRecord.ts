import medicalRecordApi from '@/apis/medical-record.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function useMedicalRecord() {
  const { medicalId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['medical-record', medicalId],
    queryFn: () => medicalRecordApi.getMedicalRecordById(medicalId as string),
    enabled: !!medicalId
  })

  console.log(data)

  const dataMedicalRecord = data?.data

  return { dataMedicalRecord, isPending }
}
