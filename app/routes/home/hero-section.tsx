import { motion } from 'motion/react'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from '@/components/ui/hero-navbar'
import { useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import { RainbowButton } from '../../components/ui/rainbow-button'
import { InteractiveHoverButton } from '../../components/ui/interactive-hover-button'
import { Safari } from '../../components/ui/safari'
import ThemeSwitcher from '../../components/shared/theme-switcher'
import recordAppointments from '../../assets/record-appointments.jpg'

export default function HeroSection() {
  return (
    <div className='relative mx-auto max-w-[1400px] flex flex-col items-center justify-center'>
      <div className='px-4 py-10 md:pt-30 xl:pb-20'>
        <h1 className='relative z-10 mx-auto text-balance text-center text-4xl tracking-tight font-bold sm:text-5xl lg:text-7xl text-foreground'>
          {'Hospital Management Streamlined in Hours, Not Days'.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut'
              }}
              className='mr-2 inline-block'
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            delay: 0.8
          }}
          className='relative z-10 mx-auto max-w-3xl py-4 tracking-tight text-sm sm:text-base text-center md:text-xl font-normal text-muted-foreground'
        >
          Spend less time on paperwork, more time with patients. Healthon automates the rest.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            delay: 1
          }}
          className='relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4'
        >
          <RainbowButton>Get unlimited access</RainbowButton>
          <InteractiveHoverButton>Stay tuned</InteractiveHoverButton>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: 1.2
          }}
          className='relative z-10 mt-16 sm:mt-20 rounded-3xl mx-auto max-w-6xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900'
        >
          <Safari url='http://healthon.vercel.app/record/appointments' imageSrc={recordAppointments} />
        </motion.div>
      </div>
    </div>
  )
}

export const HeroNavbar = () => {
  const navItems = [
    {
      name: 'Features',
      link: '#features'
    },
    {
      name: 'Pricing',
      link: '#pricing'
    },
    {
      name: 'Contact',
      link: '#contact'
    }
  ]

  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const role = useAuthStore((state) => state.role)

  return (
    <Navbar className='top-0'>
      {/* Desktop Navigation */}
      <NavBody>
        <h1 className='text-xl font-bold'>healthon</h1>
        <NavItems items={navItems} />
        <div className='flex items-center gap-4'>
          <ThemeSwitcher />
          {role && (
            <NavbarButton variant='primary' onClick={() => navigate({ pathname: path.dashboard })}>
              Dashboard
            </NavbarButton>
          )}
          {isAuthenticated && !role && (
            <NavbarButton variant='primary' onClick={() => navigate({ pathname: path.patient.register })}>
              Get Started
            </NavbarButton>
          )}
          {!isAuthenticated && (
            <NavbarButton variant='primary' onClick={() => navigate({ pathname: path.signIn })}>
              Sign in
            </NavbarButton>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <h1 className='text-xl font-bold'>healthon</h1>
          <div className='flex items-center gap-6'>
            <ThemeSwitcher />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className='relative text-neutral-600 dark:text-neutral-300 cyber:text-neutral-300'
            >
              <span className='block'>{item.name}</span>
            </a>
          ))}
          <div className='flex w-full flex-col gap-4'>
            {!isAuthenticated && (
              <NavbarButton onClick={() => navigate({ pathname: path.signIn })} variant='primary' className='w-full'>
                Sign in
              </NavbarButton>
            )}
            {isAuthenticated && !role && (
              <NavbarButton
                variant='primary'
                onClick={() => navigate({ pathname: path.patient.register })}
                className='w-full'
              >
                Get Started
              </NavbarButton>
            )}
            {role && (
              <NavbarButton onClick={() => navigate({ pathname: path.dashboard })} variant='primary' className='w-full'>
                Sign in
              </NavbarButton>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
