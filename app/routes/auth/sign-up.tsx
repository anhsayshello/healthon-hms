import type { Route } from '../+types/auth/sign-up'

import GoogleAuthButton from '@/components/auth/google-auth-button'
import AuthDivider from '@/components/auth/auth-divider'
import AuthWrapper from '@/components/auth/auth-wrapper'
import HomeBackButton from '@/components/auth/home-back-button'
import EmailLinkSent from '@/components/auth/email-link-sent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form } from '@/components/ui/form'
import AuthFormField from '@/components/auth/auth-form-field'
import MagicLinkForm from '@/components/auth/magic-link-form'
import AuthHeader from '@/components/auth/auth-header'
import { AuthSwitch } from '@/components/auth/auth-switch'
import AuthSubmitButton from '@/components/auth/auth-submit-button'
import useCreateUserWithEmailAndPassword from '@/hooks/useCreateUserWithEmailAndPassword'
import { useState } from 'react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign up' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { form, onSubmit, isPending } = useCreateUserWithEmailAndPassword()

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
        {!isSubmitted && (
          <AuthWrapper>
            <AuthHeader mode='sign-up' />
            <Tabs defaultValue='password' className='gap-4.5'>
              <TabsList className='w-full'>
                <TabsTrigger value='password'>Password</TabsTrigger>
                <TabsTrigger value='magic-link'>Magic Link</TabsTrigger>
              </TabsList>
              <TabsContent value='password'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <AuthFormField
                      control={form.control}
                      fieldName='email'
                      placeholder='name@example.com'
                      label='Email'
                    />
                    <AuthFormField
                      control={form.control}
                      type='password'
                      fieldName='password'
                      placeholder='password'
                      label='Password'
                    />
                    <AuthFormField
                      control={form.control}
                      type='password'
                      fieldName='confirm'
                      placeholder='password'
                      label='Confirm Password'
                    />
                    <AuthSubmitButton isPending={isPending} label='Sign up' />
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
              <AuthSwitch mode='sign-up' />
            </div>
          </AuthWrapper>
        )}
        {isSubmitted && <EmailLinkSent onClick={() => setIsSubmitted(false)} />}
      </div>
    </div>
  )
}
