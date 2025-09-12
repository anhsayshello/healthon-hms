import type { Route } from './+types/sign-in'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import GoogleAuthButton from '@/components/auth/google-auth-button'
import FacebookAuthButton from '@/components/auth/facebook-auth-button'
import AuthDivider from '@/components/auth/auth-divider'
import { AuthPrompt } from '@/components/auth/auth-promt'
import AuthWrapper from '@/components/auth/auth-wrapper'
import useSignIn from '@/hooks/useSignIn'
import { authService } from '@/services/authService'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign in' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignIn() {
  const { form, onSubmit } = useSignIn()

  return (
    <div className='flex items-center justify-center h-screen'>
      <AuthWrapper>
        <div className='text-2xl font-medium'>Sign in</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id='email' placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id='password' placeholder='Enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </form>
        </Form>
        <AuthPrompt mode='signin' />
        <AuthDivider />
        <div className='flex flex-col gap-4'>
          <GoogleAuthButton />
          <FacebookAuthButton />
        </div>
      </AuthWrapper>
      <Button onClick={authService.handleSignOut}>sign out</Button>
    </div>
  )
}
