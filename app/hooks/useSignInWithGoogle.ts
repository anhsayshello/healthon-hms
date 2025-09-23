import finalizeSignIn from '@/helpers/finalizeSignIn'
import { auth } from '@/lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useCallback, useState } from 'react'

export default function useSignInWithGoogle() {
  const [isPending, setIsPending] = useState(false)
  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setIsPending(true)
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      const userCred = await signInWithPopup(auth, provider)
      finalizeSignIn(userCred)
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }, [])

  return { handleSignInWithGoogle, isPending }
}
