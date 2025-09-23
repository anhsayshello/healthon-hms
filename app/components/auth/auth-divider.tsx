export default function AuthDivider() {
  return (
    <div className="relative flex items-center justify-center before:content-[''] before:flex-1 before:h-px before:bg-primary/10 after:content-[''] after:flex-1 after:h-px after:bg-primary/10">
      <span className='text-xs text-muted-foreground font-medium px-5 bg-white uppercase'>or continue with</span>
    </div>
  )
}
