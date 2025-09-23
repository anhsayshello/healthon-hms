import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import finalizeSignIn from '@/helpers/finalizeSignIn'

export default function useCreateUserWithEmailAndPassword() {
  const [isPending, setIsPending] = useState(false)

  const formSchema = z
    .object({
      email: z.email(),
      password: z.string().min(8, 'Password must be at least 8 characters.'),
      confirm: z.string().nonempty('Confirm password is required')
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm']
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    console.log(values)
    try {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)
      finalizeSignIn(userCred)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message
        switch (error.code) {
          case 'auth/email-already-in-use':
            form.setError('email', {
              type: 'manual',
              message: 'Email already exists'
            })
            break
          default:
            form.setError('password', { type: 'manual', message: error.message })
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
