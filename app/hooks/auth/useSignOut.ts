import { signOut } from 'firebase/auth'
import { useAuthStore } from '@/stores/useAuthStore'
import { auth } from '@/lib/firebase/client'
import { useUserCredential } from '@/stores/useUserCredentialStore'

export default function useSignOut() {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const clearUserCred = useUserCredential((state) => state.clearUserCred)

  async function handleSignOut() {
    try {
      await signOut(auth)
      clearAuth()
      clearUserCred()
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  return { handleSignOut }
}
