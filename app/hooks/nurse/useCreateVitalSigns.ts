import nurseApi from '@/apis/nurse.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreatVitalSigns() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: nurseApi.createVitalSigns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vital-signs'] })
    }
  })

  return { mutate, isPending }
}
