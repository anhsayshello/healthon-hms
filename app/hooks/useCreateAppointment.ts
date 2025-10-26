import appointmentApi from '@/apis/appointment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useCreateAppointment() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.createNewAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointment'] })
      toast.success('Appointment create successfully')
    }
  })

  return { mutate, isPending }
}
