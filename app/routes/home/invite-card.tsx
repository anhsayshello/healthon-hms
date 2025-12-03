import { WobbleCard } from '@/components/ui/wobble-card'

export default function InviteCard() {
  return (
    <div className='relative -mx-6'>
      <div className='relative py-12 md:py-20 max-w-6xl w-full mx-auto px-6 sm:px-10'>
        <WobbleCard containerClassName='col-span-1 lg:col-span-3 bg-blue-900 '>
          <div className='max-w-sm'>
            <h2 className='max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!
            </h2>
            <p className='mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200'>
              With over 100,000 mothly active bot users, Gippity AI is the most popular AI platform for developers.
            </p>
          </div>
          <img
            src='/linear.webp'
            width={500}
            height={500}
            alt='linear demo image'
            className='absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl'
          />
        </WobbleCard>
      </div>
    </div>
  )
}
