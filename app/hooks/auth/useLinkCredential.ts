import { auth } from '@/lib/firebase/client'
import { EmailAuthProvider, GoogleAuthProvider, linkWithCredential, linkWithPopup, type User } from 'firebase/auth'

export default function useLinkCredential() {
  const linkWithEmailAndPassword = async (email: string, password: string) => {
    const credential = EmailAuthProvider.credential(email, password)
    try {
      const userCred = await linkWithCredential(auth.currentUser as User, credential)
      const user = userCred.user
      console.log('Account linking success', user)
    } catch (error) {
      console.log('Account linking error', error)
    }
  }

  const linkWithEmailLink = async (email: string) => {
    const credential = EmailAuthProvider.credentialWithLink(email, window.location.href)
    try {
      const userCred = await linkWithCredential(auth.currentUser as User, credential)
      const user = userCred.user
      console.log('Account linking success', user)
    } catch (error) {
      console.log('Account linking error', error)
    }
  }

  const linkWithGooglePopup = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const userCred = await linkWithPopup(auth.currentUser as User, provider)
      const user = userCred.user
      console.log('Account linking success', user)
    } catch (error) {
      console.log('Account linking error', error)
    }
  }

  return { linkWithEmailAndPassword, linkWithEmailLink, linkWithGooglePopup }
}
