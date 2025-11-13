import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateAppointment() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointment'] })
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointments'] })
      queryClient.invalidateQueries({ queryKey: ['doctor', 'appointments'] })
    }
  })

  return { mutate, isPending }
}
