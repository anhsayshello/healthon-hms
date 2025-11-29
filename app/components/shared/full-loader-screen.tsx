import { Spinner } from '../ui/spinner'

export default function FullScreenLoader() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-transparent'>
      <Spinner />
    </div>
  )
}
