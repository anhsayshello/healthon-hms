import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { User as FirebaseUser } from 'firebase/auth'
import type { Role } from '@/types/role'

type User = Pick<FirebaseUser, 'uid' | 'email' | 'phoneNumber' | 'displayName' | 'photoURL'> | null

type AuthStore = {
  access_token: string | null
  isAuthenticated: boolean
  user: User
  role: Role
  setAuth: (token: string | null, user: User, role: Role) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      access_token: null,
      isAuthenticated: false,
      user: null,
      role: null,

      setAuth: (token, user, role) =>
        set({
          access_token: token,
          isAuthenticated: Boolean(token),
          user,
          role: role
        }),

      clearAuth: () =>
        set({
          access_token: null,
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
