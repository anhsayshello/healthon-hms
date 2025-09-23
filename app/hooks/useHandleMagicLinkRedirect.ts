import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import finalizeSignIn from '@/helpers/finalizeSignIn'
import { auth } from '@/lib/firebase'

export default function useHandleMagicLinkRedirect() {
  const [isVerifying, setVerifying] = useState(false)

  const handleSignInWithEmailLink = useCallback(async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setVerifying(true)
      const email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        toast.error('Sign in failed. Please try again.')
        setVerifying(false)
        return
      }
      try {
        const userCred = await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
        finalizeSignIn(userCred)
      } catch (error) {
        console.log(error)
      } finally {
        setVerifying(false)
      }
    }
  }, [])

  useEffect(() => {
    handleSignInWithEmailLink()
  }, [handleSignInWithEmailLink])

  return { isVerifying }
}
