import { OctagonAlert, UserRoundX } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { DeleteUserSchema } from '@/lib/schemas/admin-form'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertTitle } from '@/components/ui/alert'

import useDeleteUser from '@/hooks/useDeleteUser'
import { useIsMobile } from '@/hooks/use-mobile'

export default function DeleteUser({ uid, email }: { uid: string; email: string }) {
  const isMobile = useIsMobile()
  const { mutate, isPending } = useDeleteUser()

  const form = useForm<z.infer<ReturnType<typeof DeleteUserSchema>>>({
    resolver: zodResolver(DeleteUserSchema(uid)),
    defaultValues: { confirm_uid: '' }
  })

  const onSubmit = (data: z.infer<ReturnType<typeof DeleteUserSchema>>) => {
    mutate(data.confirm_uid)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full py-1 justify-start'>
          <UserRoundX className='size-4 text-destructive' />
          <span className='text-destructive'>Delete user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px] space-y-2' showCloseButton={isMobile}>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>After you delete an account, it's permanently deleted.</DialogDescription>
        </DialogHeader>
        <Separator />
        <form id='form-delete-user' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='confirm_uid'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <p className='text-sm'>
                    To confirm, type <span className='font-semibold wrap-anywhere'>"{uid}"</span>
                  </p>
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <div className='flex items-center gap-2'>
                      <OctagonAlert className='shrink-0' size={18} />
                      <FieldError className='wrap-anywhere' errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />
            <Controller
              name='confirm_delete'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <p className='text-sm'>
                    To confirm, type <span className='font-semibold wrap-anywhere'>“delete user”</span>
                  </p>
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <div className='flex items-center gap-2'>
                      <OctagonAlert className='shrink-0' size={18} />
                      <FieldError className='wrap-anywhere' errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Separator />
        <div className='space-y-3'>
          <div>
            <div className='text-muted-foreground text-[13px]'>User Account</div>
            <div className='text-[15px]'>{email}</div>
          </div>
          <Alert variant='destructive' className='bg-destructive/5 border border-destructive/20'>
            <OctagonAlert />
            <AlertTitle>Deleting user cannot be undone.</AlertTitle>
          </Alert>
        </div>

        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button form='form-delete-user' className='cursor-pointer' variant='destructive' disabled={isPending}>
            {isPending && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
