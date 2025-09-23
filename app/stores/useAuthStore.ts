import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { User as FirebaseUser } from 'firebase/auth'
import type { Role } from '@/types/role.type'

// type User = Pick<FirebaseUser, 'uid' | 'email' | 'photoURL' | 'displayName'> | null

type AuthStore = {
  idToken: string | null
  isAuthenticated: boolean
  user: FirebaseUser | null
  role: Role | null
  setAuth: (idToken: string | null, user: FirebaseUser | null, role: Role) => void
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
