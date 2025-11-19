import { DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'

export default function CancelButton() {
  return (
    <DialogClose asChild>
      <Button variant={'outline'}>Cancel</Button>
    </DialogClose>
  )
}
