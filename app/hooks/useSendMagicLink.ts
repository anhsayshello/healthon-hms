import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendSignInLinkToEmail } from 'firebase/auth'
import { actionCodeSettings, auth } from '@/lib/firebase/client'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import path from '@/constants/path'

export default function useSendMagicLink() {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.email()
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    try {
      await sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', values.email)
      navigate({ pathname: path.emailLinkSent })
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message

        if (errorCode === 'auth/quota-exceeded') {
          form.setError('email', {
            message: 'Sign in limit exceeded. Please try again later.'
          })
        } else {
          form.setError('email', {
            message: errorMessage
          })
        }
      } else {
        console.log('Unknown error:', error)
      }
    } finally {
      setIsPending(false)
    }
  }

  return { form, onSubmit, isPending }
}
