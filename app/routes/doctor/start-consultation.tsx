import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import path from '@/constants/path'
import useStartConsultation from '@/hooks/doctor/useStartConsultation'
import { Stethoscope } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function StartConsultation({
  appointment_id,
  medical_record_id
}: {
  appointment_id: number
  medical_record_id: number
}) {
  const { mutate } = useStartConsultation()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const onSubmit = () => {
    mutate(appointment_id, {
      onSuccess: (data) => {
        navigate({ pathname: `${path.record.medicalRecords}/${medical_record_id}` })
        toast.success(data.data.message)
      },
      onSettled: () => {
        setTimeout(() => setIsPending(false), 1000)
      }
    })
  }

  return (
    <Button className='cursor-pointer' onClick={onSubmit} disabled={isPending}>
      {isPending && <Spinner />}
      <Stethoscope />
      <span>Start consultation</span>
    </Button>
  )
}
