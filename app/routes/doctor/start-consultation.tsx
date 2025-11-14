import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import path from '@/constants/path'
import useStartConsultation from '@/hooks/doctor/useStartConsultation'
import { Stethoscope } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function StartConsultation({
  appointment_id,
  medical_record_id
}: {
  appointment_id: number
  medical_record_id: number
}) {
  const { mutate, isPending } = useStartConsultation()
  const navigate = useNavigate()

  const onSubmit = () => {
    mutate(appointment_id, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        navigate({ pathname: `${path.record.medicalRecords}/${medical_record_id}` })
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
