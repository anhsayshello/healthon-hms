import { create } from 'zustand'
import type { Role } from '@/types/role.type'
import { actionCodeSettings, auth } from '@/lib/firebase/client'
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth'
import type { NavigateFunction } from 'react-router'
import path from '@/constants/path'
import authApi from '@/apis/auth.api'
import { toast } from 'sonner'
import { FirebaseError } from 'firebase/app'
import type UserAuth from '@/types/auth.type'
import { useUserCredentialStore } from './useUserCredentialStore'

type AuthStore = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: UserAuth | null
  role: Role | null

  initializeAuth: (navigate: NavigateFunction) => () => void
  refreshAuth: () => Promise<void>
  logOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: null,

  initializeAuth: (navigate) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          try {
            await sendEmailVerification(user, actionCodeSettings)
            navigate({ pathname: path.emailVerification })
          } catch (error) {
            if (error instanceof FirebaseError) {
              const errorMessage = error.message
              toast.error(errorMessage)
            }
            console.log(error)
          }
          return
        }
        try {
          const [res, idTokenResult] = await Promise.all([authApi.verifyUser(), user.getIdTokenResult()])
          const userData = res.data
          const role = idTokenResult.claims?.role as Role

          set({
            isAuthenticated: true,
            role,
            user: userData,
            isInitialized: true
          })
        } catch (error) {
          console.error(error)
          set({ isAuthenticated: false, user: null, role: null, isInitialized: true })
        }
      } else {
        set({
          isAuthenticated: false,
          user: null,
          role: null,
          isInitialized: true
        })
        useUserCredentialStore.getState().clearUserCred()
      }
    })

    return unsubscribe
  },

  refreshAuth: async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    try {
      await currentUser.getIdToken(true)
      const [res, idTokenResult] = await Promise.all([authApi.verifyUser(), currentUser.getIdTokenResult()])
      const userData = res.data
      const role = idTokenResult.claims?.role as Role

      set({
        isAuthenticated: true,
        role,
        user: userData,
        isInitialized: true
      })
    } catch (error) {
      console.error('Refresh auth failed', error)
    }
  },

  logOut: async () => {
    try {
      await signOut(auth)
      set({ isAuthenticated: false, user: null, role: null })
      useUserCredentialStore.getState().clearUserCred()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
}))
