import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'

type AuthStore = {
  idToken: string | null
  isAuthenticated: boolean
  user: Patient | null
  role: Role | null
  setIdToken: (idToken: string | null) => void
  setUser: (user: Patient | null) => void
  setRole: (role: Role | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      idToken: null,
      isAuthenticated: false,
      user: null,
      role: null,

      setIdToken: (idToken) => {
        set({
          idToken,
          isAuthenticated: Boolean(idToken)
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
          idToken: null,
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
