import { FirebaseError } from 'firebase/app'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithPopup,
  signOut,
  type UserCredential
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role } from '@/types/role'
import authApi from '@/apis/auth.api'
import { HttpStatusCode } from 'axios'

export interface GoogleTokenResponse {
  federatedId: string
  providerId: string
  email: string
  emailVerified: boolean
  firstName: string
  fullName: string
  lastName: string
  photoUrl: string
  localId: string
  displayName: string
  idToken: string
  context: string
  oauthAccessToken: string
  oauthExpireIn: number
  refreshToken: string
  expiresIn: string
  oauthIdToken: string
  rawUserInfo: string
  kind: string
}
export interface UserCredentialExtended extends UserCredential {
  _tokenResponse: GoogleTokenResponse
}

export const authService = {
  async googleAuth() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const userCred = await signInWithPopup(auth, provider)

      const idToken = await userCred.user.getIdToken()
      const tokenRes: GoogleTokenResponse = (userCred as UserCredentialExtended)?._tokenResponse
      console.log(tokenRes, 'tokenRes')
      const res = await authApi.verifyUser({
        idToken: idToken,
        firstName: tokenRes.firstName,
        lastName: tokenRes.lastName
      })
      console.log(res, 'res')
      if (res.status === HttpStatusCode.Ok) {
        const tokenResult = await userCred.user.getIdTokenResult()
        // ????
        const role = (await tokenResult.claims.role) as Role
        console.log(role)
        console.log(tokenResult)
        const user = {
          uid: userCred.user.uid,
          email: userCred.user.email
          // phoneNumber: userCred.user.phoneNumber
        }
        useAuthStore.getState().setAuth(idToken, user, role)
      }

      console.log(userCred)
    } catch (error) {
      await signOut(auth)
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
