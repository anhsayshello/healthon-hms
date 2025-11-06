import labApi from '@/apis/lab.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function useLabTestsByMedicalId() {
  const { medicalId } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ['lab', 'tests', medicalId],
    queryFn: () => labApi.getLabTestsByMedicalId(medicalId as string),
    enabled: !!medicalId
  })
  console.log(data)
  const dataLabTestsByMedicalId = data?.data

  return { dataLabTestsByMedicalId, isPending }
}
