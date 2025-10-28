import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function handleApiError(error: AxiosError) {
  console.log(error)
  const data = error.response?.data as { error?: string; message?: string }
  const message = data?.error || data?.message || error.message || 'Something went wrong'
  toast.error(message)
}
