export default function InfoItem({
  label,
  value,
  fullWidth = false
}: {
  label: string
  value: string | undefined
  fullWidth?: boolean
}) {
  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <p className='text-muted-foreground text-sm mb-1'>{label}</p>
      <p className='text-sm font-medium flex items-center gap-1'>{value || 'N/A'}</p>
    </div>
  )
}
