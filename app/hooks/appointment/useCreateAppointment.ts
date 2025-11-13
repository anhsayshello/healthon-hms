import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateAppointment() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointments'] })
    }
  })

  return { mutate, isPending }
}
