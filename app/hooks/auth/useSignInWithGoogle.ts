import { auth } from '@/lib/firebase/client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useCallback, useState } from 'react'
import useVerifyUser from './useVerifyUser'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'

export default function useSignInWithGoogle() {
  const [isPending, setIsPending] = useState(false)
  const verifyUser = useVerifyUser()

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsPending(true)
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      const userCred = await signInWithPopup(auth, provider)
      verifyUser(userCred)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/user-disabled') {
          toast.error('Your account has been disabled by an administrator.')
        } else toast.error(errorMessage)
      }
    } finally {
      // setTimeout(() => setIsPending(false), 5000)
      setIsPending(false)
    }
  }, [])

  return { signInWithGoogle, isPending }
}
