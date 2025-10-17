import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type ThemeType = 'dark' | 'light' | 'system' | 'sunset'

type Theme = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const useThemeStore = create<Theme>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme: ThemeType) => set({ theme })
    }),
    {
      name: 'theme'
    }
  )
)
