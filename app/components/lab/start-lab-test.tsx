import { TestTubeDiagonal } from 'lucide-react'
import { Button } from '../ui/button'
import useStartLabTest from '@/hooks/lab/useStartLabTest'
import { cn } from '@/lib/utils'

export default function StartLabTest({ id }: { id: number }) {
  const { mutate, isPending } = useStartLabTest()

  const handleStartTest = () => mutate(id)

  return (
    <Button onClick={handleStartTest} disabled={isPending} className='cursor-pointer'>
      <TestTubeDiagonal className={cn(isPending && 'animate-spin')} />
      <span>{isPending ? 'Starting...' : 'Start Test'}</span>
    </Button>
  )
}
