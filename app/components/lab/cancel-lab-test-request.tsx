import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useCancelLabRequest from '@/hooks/lab/useCancelLabRequest'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { Spinner } from '../ui/spinner'

export default function CancelLabTestRequest({
  labTestId,
  labTestServiceName
}: {
  labTestId: number
  labTestServiceName: string
}) {
  const { mutate, isPending } = useCancelLabRequest()

  const onSubmit = () => {
    mutate(
      { id: labTestId },
      {
        onSuccess: () => {
          toast.success(`Cancelled service ${labTestServiceName}`)
        }
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Cancel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel lab test request?</DialogTitle>
          <DialogDescription>
            You are about to cancel the lab test service{' '}
            <span className='font-medium text-foreground'>{labTestServiceName}</span>. This action cannot be undone and
            the request will be permanently marked as cancelled.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Keep</Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={onSubmit} disabled={isPending} className='cursor-pointer'>
            {isPending && <Spinner />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
