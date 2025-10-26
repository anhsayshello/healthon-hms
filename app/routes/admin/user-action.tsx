import { EllipsisVertical, OctagonAlert, UserCheck, UserLock, UserPen, UserRoundX } from 'lucide-react'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
import useRole from '@/hooks/use-role'
import { Separator } from '@/components/ui/separator'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { DeleteUserSchema, SetUserRoleSchema } from '@/lib/schemas/admin-form'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type Role, RoleEnum, type StaffRole } from '@/types/role.type'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import useDeleteUser from '@/hooks/useDeleteUser'
import useUpdateUserAccess from '@/hooks/useUpdateUserAccess'
import useUpdateStaffRole from '@/hooks/useUpdateStaffRole'

export default function UserAction({ uid, role, disabled }: { uid: string; role?: Role; disabled: boolean }) {
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
          <SetStaffRole uid={uid} currentRole={role} />
          <Separator />
          <SetUserAccess uid={uid} disabled={disabled} />
          <Separator />
          <DeleteUser uid={uid} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const ROLE_PERMISSIONS = [
  {
    label: 'Admin',
    role: RoleEnum.ADMIN,
    description: 'Full system access with all administrative privileges',
    routes: [
      'Dashboard',
      'Users Management',
      'Doctors Management',
      'Patients Records',
      'Staff Records',
      'Appointments',
      'Medical Records',
      'Billing Overview',
      'Administer Medications',
      'Audit Logs',
      'System Settings',
      'Notifications'
    ]
  },
  // {
  //   label: 'Doctor',
  //   role: RoleEnum.DOCTOR,
  //   description: 'Medical professional with patient care access',
  //   routes: [
  //     'Dashboard',
  //     'Patients Records',
  //     'Staff Records',
  //     'Appointments',
  //     'Medical Records',
  //     'Billing Overview',
  //     'Administer Medications',
  //     'Notifications'
  //   ]
  // },
  {
    label: 'Nurse',
    role: RoleEnum.NURSE,
    description: 'Healthcare provider with patient care responsibilities',
    routes: [
      'Dashboard',
      'Patients Records',
      'Appointments',
      'Medical Records',
      'Patient Management',
      'Administer Medications',
      'Notifications'
    ]
  },
  // {
  //   label: 'Patient',
  //   role: RoleEnum.PATIENT,
  //   description: 'Personal health information and appointment access',
  //   routes: ['Dashboard', 'Profile', 'Appointments', 'Medical Records', 'Prescriptions', 'Billing', 'Notifications']
  // },
  {
    label: 'Lab Technician',
    role: RoleEnum.LAB_TECHNICIAN,
    description: 'Laboratory test and results management',
    routes: ['Dashboard', 'Lab Results Management', 'Notifications']
  },
  {
    label: 'Cashier',
    role: RoleEnum.CASHIER,
    description: 'Financial transactions and billing operations',
    routes: ['Dashboard', 'Billing Operations', 'Payment Processing', 'Notifications']
  }
]

export function SetStaffRole({ uid, currentRole }: { uid: string; currentRole?: StaffRole }) {
  const [open, setOpen] = useState(false)
  const { isStaff } = useRole()
  const { mutate, isPending } = useUpdateStaffRole()

  const form = useForm<z.infer<typeof SetUserRoleSchema>>({
    resolver: zodResolver(SetUserRoleSchema),
    defaultValues: {
      role: currentRole
    }
  })
  const selectedRole = form.watch('role')

  const onSubmit = (data: z.infer<typeof SetUserRoleSchema>) => {
    mutate({ uid, role: data.role })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} disabled={!isStaff} className='w-full !py-1 !justify-start'>
          <UserPen />
          <span>Set staff role</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto space-y-3' showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Set Staff Role</DialogTitle>
          <DialogDescription>
            "Assign a role to staff {uid}. This will change their access permissions immediately."
          </DialogDescription>
        </DialogHeader>
        <form id='form-set-role' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='role'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Role <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
                  </FieldLabel>
                  <div className='grid grid-cols-2 gap-4'>
                    {ROLE_PERMISSIONS.map((item) => {
                      return (
                        <Card
                          key={item.role}
                          onClick={() => field.onChange(item.role)}
                          className={cn(
                            'transition-all cursor-pointer hover:shadow-md',
                            selectedRole === item.role && 'ring-1 ring-primary',
                            fieldState.invalid && 'text-destructive border-destructive',
                            selectedRole === item.role && fieldState.invalid && 'ring-0 ring-destructive'
                          )}
                        >
                          <CardHeader>
                            <CardTitle>{item.label}</CardTitle>
                            <CardDescription className={fieldState.invalid ? 'text-destructive' : ''}>
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )
                    })}
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button form='form-set-role' disabled={isPending}>
            {isPending && <Spinner />}
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SetUserAccess({ uid, disabled }: { uid: string; disabled: boolean }) {
  const { mutate, isPending } = useUpdateUserAccess()

  const handleDisabledChange = (checked: boolean) => {
    mutate({ uid, disabled: !checked })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full !py-1 !justify-start'>
          {disabled ? (
            <>
              <UserCheck />
              <span>Enable user</span>
            </>
          ) : (
            <>
              <UserLock />
              <span>Disable user</span>
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md' showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>User Access Control</DialogTitle>
          <DialogDescription>
            Modifies the user’s authentication state and synchronizes access permissions across all active sessions.
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center space-x-3 rounded-lg border p-4'>
          <Switch
            id='user-access'
            defaultChecked={!disabled}
            onCheckedChange={handleDisabledChange}
            disabled={isPending}
            className='cursor-pointer'
          />
          <Label htmlFor='user-access' className='flex-1 cursor-pointer font-medium'>
            {disabled ? 'Grant Access' : 'Revoke Access'}
          </Label>
          <div className='flex items-center gap-2 text-sm text-muted-foreground font-semibold'>
            {isPending && <Spinner />}
            {disabled ? (
              <span className='text-destructive'>Disabled</span>
            ) : (
              <span className='text-green-600'>Enabled</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUser({ uid }: { uid: string }) {
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
        <Alert variant='destructive' className='bg-destructive/5 border border-destructive/20'>
          <OctagonAlert />
          <AlertTitle>Deleting user cannot be undone.</AlertTitle>
        </Alert>

        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button form='form-delete-user' className='cursor-pointer' variant='destructive' disabled={isPending}>
            {isPending && <Spinner />}
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
