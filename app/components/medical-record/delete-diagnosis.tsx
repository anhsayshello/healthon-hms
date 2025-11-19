import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import useDeleteDiagnosis from '@/hooks/medical-record/useDeleteDiagnosis'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import CancelButton from '../shared/cancel-button'

export default function DeleteDiagnosis({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteDiagnosis()

  const onSubmit = () => {
    mutate(id, {
      onSuccess: (data) => {
        toast.success(data.data?.message)
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={'destructive'} className='cursor-pointer'>
          <Trash2 />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete diagnosis?</DialogTitle>
          <DialogDescription>
            You are about to permanently delete this diagnosis record. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CancelButton />
          <Button variant={'destructive'} onClick={onSubmit} disabled={isPending} className='cursor-pointer'>
            {isPending && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
