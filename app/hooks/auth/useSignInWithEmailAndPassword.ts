import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { SignInFormSchema } from '@/lib/schemas/auth-form'
import { useUserCredentialStore } from '@/stores/useUserCredentialStore'

export default function useSignInWithEmailAndPassword() {
  const [isPending, setIsPending] = useState(false)
  const setUserCred = useUserCredentialStore((state) => state.setUserCred)

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    setIsPending(true)
    try {
      const userCred = await signInWithEmailAndPassword(auth, data.email, data.password)
      setUserCred(userCred)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        switch (error.code) {
          case 'auth/invalid-credential':
            form.setError('email', {
              message: ''
            })
            form.setError('password', {
              message: 'Email or password is incorrect'
            })
            break
          case 'auth/user-disabled':
            form.setError('email', {
              message: ''
            })
            form.setError('password', {
              message: 'Your account has been disabled by an administrator.'
            })
            break
          default:
            form.setError('email', {
              message: ''
            })
            form.setError('password', { message: error.message })
        }
        console.log(errorCode)
        console.log(errorMessage)
      } else {
        console.log('Unknown error:', error)
      }
    } finally {
      setTimeout(() => setIsPending(false), 1500)
    }
  }

  return { form, onSubmit, isPending }
}
