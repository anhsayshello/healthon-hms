import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { Patient } from '@/types/patient.type'
import type { Role } from '@/types/role.type'

type AuthStore = {
  idToken: string | null
  isAuthenticated: boolean
  user: Patient | null
  role: Role | null
  setAuth: (idToken: string | null, user: Patient | null, role: Role | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      idToken: null,
      isAuthenticated: false,
      user: null,
      role: null,

      setAuth: (idToken, user, role) =>
        set({
          idToken: idToken,
          isAuthenticated: Boolean(idToken),
          user,
          role: role
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
      name: 'auth_store'
    }
  )
)
