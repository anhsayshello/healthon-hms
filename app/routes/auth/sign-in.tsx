import type { Route } from '../auth/+types/sign-in'

import GoogleAuthButton from '@/components/features/auth/google-auth-button'
import AuthDivider from '@/components/features/auth/auth-divider'
import AuthWrapper from '@/components/features/auth/auth-wrapper'
import HomeBackButton from '@/components/features/auth/home-back-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form } from '@/components/ui/form'
import AuthFormField from '@/components/features/auth/auth-form-field'
import MagicLinkForm from '@/components/features/auth/magic-link-form'
import AuthHeader from '@/components/features/auth/auth-header'
import { AuthSwitch } from '@/components/features/auth/auth-switch'
import AuthSubmitButton from '@/components/features/auth/auth-submit-button'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'
import useSignInWithEmailAndPassword from '@/hooks/auth/useSignInWithEmailAndPassword'
import useHandleMagicLinkRedirect from '@/hooks/auth/useHandleMagicLinkRedirect'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign in' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignIn() {
  const { form, onSubmit, isPending } = useSignInWithEmailAndPassword()
  const { isVerifying, handleMagicLinkRedirect } = useHandleMagicLinkRedirect()

  useEffect(() => {
    handleMagicLinkRedirect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
        <AuthWrapper>
          {isVerifying && (
            <div className='absolute inset-0 bg-primary-foreground/40 flex items-center justify-center'>
              <Spinner />
            </div>
          )}
          <AuthHeader mode='sign-in' />
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
                    placeholder='Enter your password'
                    label='Password'
                  />
                  <AuthSubmitButton isPending={isPending} label='Sign in' />
                </form>
              </Form>
            </TabsContent>
            <TabsContent value='magic-link'>
              <MagicLinkForm />
            </TabsContent>
          </Tabs>
          <div className='grid gap-4.5'>
            <AuthDivider />
            <GoogleAuthButton />
            <AuthSwitch mode='sign-in' />
          </div>
        </AuthWrapper>
      </div>
    </div>
  )
}
