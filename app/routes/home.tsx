import path from '@/constants/path'
import type { Route } from './+types/home'
import { Link } from 'react-router'
import Dither from '@/components/Dither'
import { Button } from '@/components/ui/button'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  return (
    <div className=''>
      <div className='w-full h-screen relative'>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
        <div className='pointer-events-none'>
          <div className='absolute top-10 w-full h-15'>
            <div className='mx-auto w-[90%] md:w-[60%] h-full rounded-full py-4 px-6 flex items-center justify-between text-white bg-white/5 backdrop-blur-[10px] border border-white/20'>
              <p className='pointer-events-auto'>Healthon</p>
              <Link to={path.signIn} className='pointer-events-auto'>
                Sign in
              </Link>
            </div>
          </div>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <Button className='rounded-full bg-white/5 backdrop-blur-[10px] border border-white/20'>Learn</Button>
            <p className='mt-4 text-3xl md:text-4xl lg:text-[40px] text-center tracking-tighter font-bold text-shadow-lg/20 w-[80%] text-primary-foreground'>
              Retro healthon waves to enhance your UI
            </p>
            <div className='mt-8 flex items-center gap-4'>
              <button className='pointer-events-auto cursor-pointer py-2 px-6 md:py-3 md:px-10 text-sm xl:text-base rounded-full bg-primary-foreground text-foreground'>
                Get started
              </button>
              <button className='pointer-events-auto cursor-pointer py-2 px-6 md:py-3 md:px-10 text-sm xl:text-base rounded-full bg-white/5 backdrop-blur-[10px] border border-white/20 text-white/30'>
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
