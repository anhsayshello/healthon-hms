import appointmentApi from '@/apis/appointment.api'
import handleApiError from '@/helpers/handleApiError'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateAppointment() {
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.updateAppointmentDetail,
    onSuccess: (data) => {
      console.log(data)
      toast.success('Updated appointment successfully')
    },
    onError: (error: AxiosError) => {
      handleApiError(error)
    }
  })

  return { mutate, isPending }
}
