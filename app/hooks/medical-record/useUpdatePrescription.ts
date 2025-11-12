import medicalRecordApi from '@/apis/medical-record.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdatePrescription() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: medicalRecordApi.updatePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-record'] })
    }
  })

  return { mutate, isPending }
}
