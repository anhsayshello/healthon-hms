import doctorApi from '@/apis/doctor.api'
import { useMutation } from '@tanstack/react-query'

export default function useStartConsultation() {
  const { mutate, isPending } = useMutation({
    mutationFn: doctorApi.startConsultation
  })

  return { mutate, isPending }
}
