import patientApi from '@/apis/patient.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useUpsertPatient(type: 'create' | 'update') {
  const { setUser, setRole } = useAuthStore()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationKey: ['patient', 'upsert'],
    mutationFn: patientApi.upsertPatient,
    onSuccess: async (data) => {
      const role = data.data.role
      setRole(role)
      setUser(data.data.data)
      await queryClient.invalidateQueries({ queryKey: ['patient', 'information'] })
      toast.success(`${type === 'create' ? 'Patient created successfully' : 'Patient updated successfully'}`)
    }
  })

  return { mutate, isPending }
}
