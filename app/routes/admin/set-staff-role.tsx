import { UserPen } from 'lucide-react'
import { useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { StaffRoleSchema } from '@/lib/schemas/admin-form'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleEnum, type StaffRole } from '@/types/role.type'
import { cn } from '@/lib/utils'

import useUpdateStaffRole from '@/hooks/useUpdateStaffRole'
import { useIsMobile } from '@/hooks/use-mobile'

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

export function SetStaffRole({ uid, staffRole }: { uid: string; staffRole: StaffRole }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const { isAdmin } = useRole()
  const isStaff = ['ADMIN', 'NURSE', 'LAB_TECHNICIAN', 'CASHIER'].includes(staffRole)
  const { mutate, isPending } = useUpdateStaffRole()

  const form = useForm<z.infer<typeof StaffRoleSchema>>({
    resolver: zodResolver(StaffRoleSchema),
    defaultValues: {
      role: staffRole
    }
  })
  const selectedRole = form.watch('role')

  const onSubmit = (data: z.infer<typeof StaffRoleSchema>) => {
    mutate({ uid, role: data.role })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} disabled={!isAdmin || !isStaff} className='w-full py-1 justify-start'>
          <UserPen />
          <span>Set staff role</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto space-y-3' showCloseButton={isMobile}>
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
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
