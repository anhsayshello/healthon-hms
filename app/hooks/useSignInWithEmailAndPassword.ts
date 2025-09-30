import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getAdditionalUserInfo, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import useLinkCredential from './useLinkCredential'
import useVerifyUser from './useVerifyUser'

export default function useSignInWithEmailAndPassword() {
  const [isPending, setIsPending] = useState(false)
  const { linkWithGooglePopup } = useLinkCredential()
  const verifyUser = useVerifyUser()

  const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters.')
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    console.log(values)
    try {
      const userCred = await signInWithEmailAndPassword(auth, values.email, values.password)
      const result = getAdditionalUserInfo(userCred)
      linkWithGooglePopup()
      console.log(result)
      verifyUser(userCred)
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
              message: 'Invalid email or password'
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
      setIsPending(false)
    }
  }

  return { form, onSubmit, isPending }
}
