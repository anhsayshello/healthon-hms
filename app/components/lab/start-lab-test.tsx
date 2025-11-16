import { TestTubeDiagonal } from 'lucide-react'
import { Button } from '../ui/button'
import useStartLabTest from '@/hooks/lab/useStartLabTest'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function StartLabTest({ id }: { id: number }) {
  const { mutate } = useStartLabTest()
  const [isPending, setIsPending] = useState(false)

  const handleStartTest = () => {
    setIsPending(true)
    mutate(id, {
      onSettled: () => {
        setTimeout(() => setIsPending(false), 500)
      }
    })
  }

  return (
    <Button onClick={handleStartTest} disabled={isPending} className='cursor-pointer'>
      <TestTubeDiagonal className={cn(isPending && 'animate-spin')} />
      <span>{isPending ? 'Starting...' : 'Start Test'}</span>
    </Button>
  )
}
