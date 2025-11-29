import type { Route } from './+types/home'
import HeroSectionOne from '@/components/aceternity/hero-section-one'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Healthon' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  return (
    <div className='w-full min-h-screen flex flex-col bg-background'>
      <HeroSectionOne />
    </div>
  )
}
