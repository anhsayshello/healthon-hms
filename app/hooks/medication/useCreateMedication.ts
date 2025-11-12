import medicationApi from '@/apis/medication.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateMedication() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: medicationApi.createMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
    }
  })

  return { mutate, isPending }
}
