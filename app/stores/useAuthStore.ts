import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'

type AuthStore = {
  isAuthenticated: boolean
  user: Patient | null
  role: Role | null
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: Patient | null) => void
  setRole: (role: Role | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,

      setIsAuthenticated: (isAuthenticated) => {
        set({
          isAuthenticated
        })
      },
      setUser: (user) =>
        set({
          user
        }),
      setRole: (role) =>
        set({
          role
        }),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
          role: null
        })
    }),
    {
      name: 'auth-store'
    }
  )
)
