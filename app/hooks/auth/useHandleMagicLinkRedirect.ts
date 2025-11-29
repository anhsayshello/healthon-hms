import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase/client'

export default function useHandleMagicLinkRedirect() {
  const [isVerifying, setVerifying] = useState(false)

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
        await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
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
