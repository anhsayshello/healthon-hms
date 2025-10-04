import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase/client'
import { FirebaseError } from 'firebase/app'
import useVerifyUser from './useVerifyUser'

export default function useHandleMagicLinkRedirect() {
  const [isVerifying, setVerifying] = useState(false)
  const verifyUser = useVerifyUser()

  const handleMagicLinkRedirect = useCallback(async () => {
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
        verifyUser(userCred)
      } catch (error) {
        if (error instanceof FirebaseError) {
          const errorCode = error.code
          const errorMessage = error.message
          toast.error(errorMessage)
          console.log(errorCode)
          console.log(errorMessage)
        } else {
          console.log('Unknown error:', error)
        }
      } finally {
        setTimeout(() => setVerifying(false), 5000)
      }
    }
  }, [])

  return { isVerifying, handleMagicLinkRedirect }
}
