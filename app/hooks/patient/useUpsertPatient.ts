import patientApi from '@/apis/patient.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpsertPatient(type: 'create' | 'update') {
  const queryClient = useQueryClient()
  const refreshAuth = useAuthStore((state) => state.refreshAuth)

  const { isPending, mutate } = useMutation({
    mutationKey: ['patient', 'upsert'],
    mutationFn: patientApi.upsertPatient,
    onSuccess: async () => {
      await refreshAuth()
      queryClient.invalidateQueries({ queryKey: ['patient', 'information'] })
      // if (type === 'create') fireConfetti()
      toast.success(`${type === 'create' ? 'Welcome to healthon' : 'Patient updated successfully'}`)
    }
  })

  return { mutate, isPending }
}
