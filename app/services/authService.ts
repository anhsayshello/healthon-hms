import { GoogleAuthProvider, signInWithEmailLink, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/useAuthStore'
import finalizeSignIn from '@/helpers/finalizeSignIn'
import { toast } from 'sonner'

export const authService = {
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      const userCred = await signInWithPopup(auth, provider)
      finalizeSignIn(userCred)
    } catch (error) {
      await signOut(auth)
      console.log(error)
    }
  },

  async handleSignOut() {
    try {
      await signOut(auth)
      useAuthStore.getState().clearAuth()
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
}
