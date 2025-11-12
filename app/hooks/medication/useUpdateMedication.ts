import medicationApi from '@/apis/medication.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateMedication() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: medicationApi.updateMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
    }
  })

  return { mutate, isPending }
}
