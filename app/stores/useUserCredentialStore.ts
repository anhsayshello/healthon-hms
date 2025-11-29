import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { UserCredential } from 'firebase/auth'
import type { GoogleTokenResponse } from '@/types/firebase-augment'

type FirebaseUser = Pick<GoogleTokenResponse, 'email' | 'firstName' | 'lastName' | 'photoUrl'>

type UserCredentialStore = {
  userCred: FirebaseUser | null
  setUserCred: (userCred: UserCredential | null) => void
  clearUserCred: () => void
}

export const useUserCredentialStore = create<UserCredentialStore>()(
  persist(
    (set) => ({
      userCred: null,
      setUserCred: (userCred) => {
        const tokenRes = userCred?._tokenResponse

        if (!tokenRes) {
          set({ userCred: null })
          return
        }
        set({
          userCred: {
            email: tokenRes?.email,
            firstName: tokenRes?.firstName,
            lastName: tokenRes?.lastName,
            photoUrl: tokenRes?.photoUrl
          }
        })
      },
      clearUserCred: () => set({ userCred: null })
    }),
    {
      name: 'user-cred'
    }
  )
)
