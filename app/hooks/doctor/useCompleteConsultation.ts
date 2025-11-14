import doctorApi from '@/apis/doctor.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCompleteConsultation() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: doctorApi.completeConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-record'] })
    }
  })

  return { mutate, isPending }
}
