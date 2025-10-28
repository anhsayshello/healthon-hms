import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateAppointment() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointmentDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'appointment'] })
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointment'] })
      queryClient.invalidateQueries({ queryKey: ['doctor', 'appointment'] })
      queryClient.invalidateQueries({ queryKey: ['appointment', 'detail'] })
    }
  })

  return { mutate, isPending }
}
