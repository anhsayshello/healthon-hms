import { signOut } from 'firebase/auth'
import { useAuthStore } from '@/stores/useAuthStore'
import { auth } from '@/lib/firebase/client'
import { useUserCredential } from '@/stores/useUserCredentialStore'

export default function useSignOut() {
  async function handleSignOut() {
    try {
      await signOut(auth)
      useAuthStore.getState().clearAuth()
      useUserCredential.getState().clearUserCred()
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  return { handleSignOut }
}
