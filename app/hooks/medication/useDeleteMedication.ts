import medicationApi from '@/apis/medication.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteMedication() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: medicationApi.deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
    }
  })

  return { mutate, isPending }
}
