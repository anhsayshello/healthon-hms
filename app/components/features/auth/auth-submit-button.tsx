import { Button } from '../../ui/button'
import { Spinner } from '../../ui/spinner'

export default function AuthSubmitButton({ isPending, label }: { isPending: boolean; label: string }) {
  return (
    <Button disabled={isPending} type='submit' className='w-full rounded-2xl py-5'>
      {isPending && <Spinner />}
      {label}
    </Button>
  )
}
