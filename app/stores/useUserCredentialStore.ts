import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { GoogleTokenResponse } from '@/types/common.type'

type FirebaseUser = Pick<GoogleTokenResponse, 'email' | 'firstName' | 'lastName' | 'photoUrl'>

type UserCredential = {
  userCred: FirebaseUser | null
  setUserCred: (userCred: FirebaseUser | null) => void
  clearUserCred: () => void
}

export const useUserCredential = create<UserCredential>()(
  persist(
    (set) => ({
      userCred: null,
      setUserCred: (userCred) => set({ userCred: userCred }),
      clearUserCred: () => set({ userCred: null })
    }),
    {
      name: 'usercred'
    }
  )
)
