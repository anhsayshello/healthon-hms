import HeroSection, { HeroNavbar } from '@/routes/home/hero-section'
import type { Route } from '../home/+types/home'
import { MarqueeVertical } from './marque-vertical'
import Faq from './faq'
import FeatureSection from './feature-section'
import Footer from './footer'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Healthon' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  return (
    <div className='w-full min-h-screen flex flex-col bg-background'>
      <HeroNavbar />
      <HeroSection />
      <FeatureSection />
      <MarqueeVertical />
      <Faq />
      <Footer />
    </div>
  )
}
