export default function Footer() {
  return (
    <div className='border-t w-full py-12 sm:py-20'>
      <div className='px-2 mx-auto text-center text-sm space-y-2'>
        <p>© 2025 Duc Anh. All rights reserved.</p>
        <p>Thanks to shadcn/ui, Magic UI, Aceternity UI and React Bits for inspiring this UI.</p>
        <a
          href='https://www.dmca.com/Protection/Status.aspx?ID=7ecb9033-7dbe-4d5a-ab6e-be140a4dd038&refurl=https://healthon.vercel.app/'
          title='DMCA.com Protection Status'
          className='flex items-center justify-center'
        >
          <img
            src='https://images.dmca.com/Badges/dmca_protected_sml_120c.png?ID=7ecb9033-7dbe-4d5a-ab6e-be140a4dd038'
            alt='DMCA.com Protection Status'
          />
        </a>
      </div>
    </div>
  )
}
