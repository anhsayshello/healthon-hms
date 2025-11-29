import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

import { SignUpFormSchema } from '@/lib/schemas/auth-form'
import { useUserCredentialStore } from '@/stores/useUserCredentialStore'

export default function useCreateUserWithEmailAndPassword() {
  const [isPending, setIsPending] = useState(false)
  const setUserCred = useUserCredentialStore((state) => state.setUserCred)

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: ''
    }
  })

  async function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    setIsPending(true)
    try {
      const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password)
      setUserCred(userCred)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        switch (error.code) {
          case 'auth/email-already-in-use':
            form.setError('email', {
              message: 'Email already exists'
            })
            break
          default:
            form.setError('password', { message: error.message })
        }
        console.log(errorCode)
        console.log(errorMessage)
      } else {
        console.log('Unknown error:', error)
      }
      setIsPending(false)
    }
  }

  return { form, onSubmit, isPending }
}
