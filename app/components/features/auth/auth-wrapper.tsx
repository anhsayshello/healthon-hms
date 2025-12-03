import { type ReactNode } from 'react'
import { BorderBeam } from '../../ui/border-beam'
import { useThemeStore } from '@/stores/useThemeStore'
import { ShineBorder } from '../../ui/shine-border'
import ElectricBorder from '../react-bits/ElectricBorder'

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <>
      {theme !== 'cyber' && (
        <div className='relative flex flex-col w-[450px] gap-4.5 p-8 border border-foreground/10 rounded-md overflow-hidden'>
          {children}
          {theme === 'light' && <BorderBeam duration={8} size={100} />}
          {theme === 'dark' && <ShineBorder shineColor={'#fff'} />}
        </div>
      )}
      {theme === 'cyber' && (
        <ElectricBorder color='#7df9ff' speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div className='relative flex flex-col w-[450px] gap-4.5 p-8 '>{children}</div>
        </ElectricBorder>
      )}
    </>
  )
}
