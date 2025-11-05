import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateAppointment() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointmentDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointments'] })
      queryClient.invalidateQueries({ queryKey: ['doctor', 'appointments'] })
      queryClient.invalidateQueries({ queryKey: ['appointment', 'detail'] })
    }
  })

  return { mutate, isPending }
}
