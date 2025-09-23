import type { Route } from '../+types/auth/sign-in'

import GoogleAuthButton from '@/components/auth/google-auth-button'
import AuthDivider from '@/components/auth/auth-divider'
import AuthWrapper from '@/components/auth/auth-wrapper'
import HomeBackButton from '@/components/auth/home-back-button'
import EmailLinkSent from '@/components/auth/email-link-sent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form } from '@/components/ui/form'
import AuthFormField from '@/components/auth/auth-form-field'
import MagicLinkForm from '@/components/auth/magic-link-form'
import useSignInWithEmailAndPassword from '@/hooks/useSignInWithEmailAndPassword'
import AuthHeader from '@/components/auth/auth-header'
import { AuthSwitch } from '@/components/auth/auth-switch'
import AuthSubmitButton from '@/components/auth/auth-submit-button'
import { useState } from 'react'
import useHandleMagicLinkRedirect from '@/hooks/useHandleMagicLinkRedirect'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign in' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignIn() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { form, onSubmit, isPending } = useSignInWithEmailAndPassword()
  const { isVerifying } = useHandleMagicLinkRedirect()

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
        {!isSubmitted && (
          <AuthWrapper>
            <AuthHeader mode='sign-in' />
            <Tabs defaultValue={isVerifying ? 'magic-link' : 'password'} className='gap-4.5'>
              <TabsList className='w-full'>
                <TabsTrigger value='password'>Password</TabsTrigger>
                <TabsTrigger value='magic-link'>Magic Link</TabsTrigger>
              </TabsList>
              <TabsContent value='password'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <AuthFormField form={form} fieldName='email' placeholder='name@example.com' label='Email' />
                    <AuthFormField
                      form={form}
                      type='password'
                      fieldName='password'
                      placeholder='password'
                      label='Password'
                    />
                    <AuthSubmitButton isPending={isPending} label='Sign in' />
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value='magic-link'>
                <MagicLinkForm onSuccess={() => setIsSubmitted(true)} />
              </TabsContent>
            </Tabs>
            <div className='grid gap-4.5'>
              <AuthDivider />
              <GoogleAuthButton />
              <AuthSwitch mode='sign-in' />
            </div>
          </AuthWrapper>
        )}
        {isSubmitted && <EmailLinkSent onClick={() => setIsSubmitted(false)} />}
      </div>
    </div>
  )
}
