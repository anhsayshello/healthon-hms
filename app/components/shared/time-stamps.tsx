export default function Timestamps({ createdAt, updatedAt }: { createdAt: string; updatedAt: string }) {
  return (
    <div className='flex justify-between text-xs text-muted-foreground'>
      <span>Created: {new Date(createdAt).toLocaleString('en-US')}</span>
      <span>Updated: {new Date(updatedAt).toLocaleString('en-US')}</span>
    </div>
  )
}
