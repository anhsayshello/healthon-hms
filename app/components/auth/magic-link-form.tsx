import { Form } from '@/components/ui/form'
import AuthFormField from './auth-form-field'
import AuthSubmitButton from './auth-submit-button'
import useSendMagicLink from '@/hooks/useSendMagicLink'

export default function MagicLinkForm() {
  const { form, onSubmit, isPending } = useSendMagicLink()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <AuthFormField control={form.control} fieldName='email' placeholder='name@example.com' label='Email' />
        <AuthSubmitButton isPending={isPending} label='Send magic link' />
      </form>
    </Form>
  )
}
