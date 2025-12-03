import type { Route } from '../auth/+types/sign-up'

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
import useCreateUserWithEmailAndPassword from '@/hooks/auth/useCreateUserWithEmailAndPassword'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign up' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function SignUp() {
  const { form, onSubmit, isPending } = useCreateUserWithEmailAndPassword()

  return (
    <div className='relative'>
      <HomeBackButton />
      <div className='flex items-center justify-center h-screen'>
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
                    placeholder='Enter your email'
                    label='Email'
                  />
                  <AuthFormField
                    control={form.control}
                    type='password'
                    fieldName='password'
                    placeholder='Enter your password'
                    label='Password'
                  />
                  <AuthFormField
                    control={form.control}
                    type='password'
                    fieldName='confirm'
                    placeholder='Enter your password'
                    label='Confirm'
                  />
                  <AuthSubmitButton isPending={isPending} label='Sign up' />
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
            <AuthSwitch mode='sign-up' />
          </div>
        </AuthWrapper>
      </div>
    </div>
  )
}
