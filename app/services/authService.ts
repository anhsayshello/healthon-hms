import { FirebaseError } from 'firebase/app'
import { FacebookAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role } from '@/types/role'

export const authService = {
  async googleAuth() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const userCred = await signInWithPopup(auth, provider)

      const accessToken = await userCred.user.getIdToken()
      const tokenResult = await userCred.user.getIdTokenResult()
      const role = (tokenResult.claims.role as Role) || 'admin'
      console.log(tokenResult)
      const user = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        phoneNumber: userCred.user.phoneNumber,
        displayName: userCred.user.displayName,
        photoURL: userCred.user.photoURL
      }
      if (accessToken) {
        useAuthStore.getState().setAuth(accessToken, user, role)
      }
      console.log(userCred)
    } catch (error) {
      console.log(error)
    }
  },

  async facebookAuth() {
    try {
      const userCred = await signInWithPopup(auth, new FacebookAuthProvider())
      const user = userCred.user
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(userCred)
      const accessToken = (credential as OAuthCredential).accessToken
      console.log(accessToken)
      console.log(user)

      // IdP data available using getAdditionalUserInfo(result)
    } catch (error) {
      // Handle Errors here.
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData?.email
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error)
        console.log(error)
      }
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
