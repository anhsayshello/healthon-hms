import { BadgeCheckIcon, EllipsisVertical, OctagonAlert, UserPen, UserRoundX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import useRole from '@/hooks/use-role'
import { Separator } from '@/components/ui/separator'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { DeleteUserSchema } from '@/lib/schemas/admin-form'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import adminApi from '@/apis/admin.api'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

export default function UserAction({ uid }: { uid: string }) {
  const { isAdmin } = useRole()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='cursor-pointer'>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='!p-1 w-36'>
        <div className='space-y-1 text-sm'>
          <div className='py-1 px-3'>Actions</div>
          <Separator />
          <SetUserRole uid={uid} />
          <Separator />
          <DeleteUser uid={uid} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SetUserRole({ uid }: { uid: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full !py-1 !justify-start'>
          <UserPen />
          <span>Set user role</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>This action cannot be undone. Please provide a reason for cancellation.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUser({ uid }: { uid: string }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<ReturnType<typeof DeleteUserSchema>>>({
    resolver: zodResolver(DeleteUserSchema(uid)),
    defaultValues: { confirm_uid: '' }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: adminApi.deleteUserById,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['admin', 'firebase-users'] })
      setOpen(false)
      toast.success(data?.data?.message)
    }
  })

  const onSubmit = (data: z.infer<ReturnType<typeof DeleteUserSchema>>) => {
    mutate(data.confirm_uid)
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full !py-1 !justify-start'>
          <UserRoundX className='size-4 text-destructive' />
          <span className='text-destructive'>Delete user</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px] space-y-2' showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This will permanently delete user and related resources like Deployments, Domains and Environment Variables.
          </DialogDescription>
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
        <Item className='bg-destructive/16' size='sm' asChild>
          <div className='text-destructive'>
            <ItemMedia>
              <OctagonAlert className='size-5' />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Deleting user cannot be undone.</ItemTitle>
            </ItemContent>
          </div>
        </Item>
        <Separator />
        <div className='flex items-center justify-between'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button form='form-delete-user' className='cursor-pointer' variant='destructive' disabled={isPending}>
            {isPending && <Spinner />}
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
