import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import useCompleteConsultation from '@/hooks/doctor/useCompleteConsultation'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { BookCheck } from 'lucide-react'
import { useState } from 'react'
import CancelButton from '@/components/shared/cancel-button'

export default function CompleteConsultation({ appointment_id }: { appointment_id: number }) {
  const { mutate } = useCompleteConsultation()
  const [isPending, setIsPending] = useState(false)

  const onSubmit = () => {
    setIsPending(true)
    mutate(appointment_id, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onSettled: () => {
        setTimeout(() => setIsPending(false), 1000)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='cursor-pointer' disabled={isPending}>
          {isPending && <Spinner />}
          <BookCheck />
          Complete consultation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete this consultation?</DialogTitle>
          <DialogDescription>
            Are you sure you want to complete this consultation? Once confirmed, the session will be marked as completed
            and no further edits can be made.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='pt-2'>
          <CancelButton />
          <Button className='cursor-pointer' onClick={onSubmit} disabled={isPending}>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
