export default function AuthDivider() {
  return (
    <div
      className="relative flex items-center justify-center 
                        before:content-[''] before:flex-1 before:h-px before:bg-primary/10 
                        after:content-[''] after:flex-1 after:h-px after:bg-primary/10"
    >
      <span className='px-5 bg-white'>or</span>
    </div>
  )
}
