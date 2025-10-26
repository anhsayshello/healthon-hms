import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useCancelAppointment() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointmentDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointment'] })
      queryClient.invalidateQueries({ queryKey: ['doctor', 'appointment'] })
      toast.success('Cancel appointment successfully')
    }
  })

  return { mutate, isPending }
}
