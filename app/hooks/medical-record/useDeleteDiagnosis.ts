import medicalRecordApi from '@/apis/medical-record.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteDiagnosis() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: medicalRecordApi.deleteDiagnosis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-record'] })
    }
  })

  return { mutate, isPending }
}
