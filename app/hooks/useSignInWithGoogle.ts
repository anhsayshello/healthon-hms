import { auth } from '@/lib/firebase/client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useCallback, useState } from 'react'
import useVerifyUser from './useVerifyUser'

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
      console.log(error)
    } finally {
      setTimeout(() => setIsPending(false), 2500)
    }
  }, [])

  return { signInWithGoogle, isPending }
}
