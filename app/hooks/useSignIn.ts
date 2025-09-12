import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'

export default function useSignIn() {
  const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    })
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      const user = userCredential.user
      console.log(user)
      console.log(userCredential)
    } catch (error) {
      if (error instanceof FirebaseError) {
        form.setError('email', {
          type: 'manual',
          message: error.message
        })

        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      } else {
        console.log('Unknown error:', error)
      }
    }
  }

  return { form, onSubmit }
}
