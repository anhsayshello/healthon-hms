import type { Route } from './+types/firebase-user-management'
import UserInfo from '@/components/shared/user-info'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import CardWrapper from '@/components/shared/card-wrapper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Timestamps from '@/components/shared/time-stamps'
import { Separator } from '@/components/ui/separator'
import { PatientBasicInfo, PatientEmergencyContact, PatientMedicalInfo } from '@/components/shared/patient-information'
import InfoItem from '@/components/shared/info-item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/components/shared/profile-avatar'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Copy, User } from 'lucide-react'
import type { FirebaseUserRecord } from '@/types/index.type'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import UserAction from './user-action'
import { format } from 'date-fns'
import useFirebaseUsers from '@/hooks/useFirebaseUsers'
import useUserDetail from '@/hooks/useUserDetail'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'User Management' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const tableColumns = [
  { header: 'User uid', key: 'uid' },
  { header: 'User info', key: 'name' },
  { header: 'Role', key: 'role' },
  { header: 'Email', key: 'email' },
  { header: 'Email verified', key: 'email-verified' },
  { header: 'Access', key: 'disabled' },
  { header: 'Last login', key: 'last-login' },
  { header: 'Action', key: 'action' }
]

export default function FirebaseUserManagement() {
  const { dataUsers, isPending, isFetchingNextPage, hasNextPage, ref } = useFirebaseUsers()

  return (
    <CardWrapper>
      <div className='flex items-center gap-2'>
        <img
          className='aspect-square w-8'
          src='https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png'
          loading='lazy'
          alt=''
        />
        <div className='text-xl font-semibold'>Firebase User Management</div>
      </div>

      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {!dataUsers.length && (
          <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
        )}

        <TableBody>{dataUsers && dataUsers.map((user) => <UserDetail key={user.uid} data={user} />)}</TableBody>
      </Table>

      {dataUsers.length > 0 && (
        <div ref={ref} className='text-sm flex justify-center py-1'>
          {isFetchingNextPage ? (
            <div className='flex items-center gap-3'>
              <Spinner />
              <span>Loading more...</span>
            </div>
          ) : hasNextPage ? (
            'Load more'
          ) : (
            'Nothing more to load'
          )}
        </div>
      )}
    </CardWrapper>
  )
}

function EmptyDataUser() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <User />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function UserDetail({ data }: { data: FirebaseUserRecord }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  const { isPending, user, role, disabled, patient, doctor, description } = useUserDetail(data, open)

  const formatLastSignIn = (time?: string) => {
    if (!time) return 'Never'
    return format(new Date(time), 'dd MMM yyyy, hh:mm a')
  }

  const handleCopyUid = async () => {
    try {
      await navigator.clipboard.writeText(data.uid)
      toast.success('Copied uid to clipboard!')
    } catch (err) {
      toast.error('Failed to copy uid')
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableRow key={data.uid}>
        <TableCell>
          <div className='flex items-center gap-3'>
            <Tooltip>
              <TooltipTrigger>
                <Copy className='hover:text-muted-foreground' size={16} onClick={handleCopyUid} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy uid</p>
              </TooltipContent>
            </Tooltip>
            <span className='max-w-40 truncate text-[13px]'>{data?.uid}</span>
          </div>
        </TableCell>
        <DialogTrigger asChild>
          <TableCell className='text-[13px] cursor-pointer'>
            <UserInfo photoUrl={data?.photoURL} firstName={''} lastName={data?.displayName ?? ''} />
          </TableCell>
        </DialogTrigger>
        <TableCell>{role ? <span className='capitalize'>{role?.toLowerCase()}</span> : <span>null</span>}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.emailVerified ? 'true' : 'false'}</TableCell>
        <TableCell>
          {disabled ? (
            <span className='text-destructive'>disabled</span>
          ) : (
            <span className='text-green-500'>enabled</span>
          )}
        </TableCell>
        <TableCell>{formatLastSignIn(data.metadata.lastSignInTime)}</TableCell>
        <TableCell>
          <UserAction uid={data.uid} email={data.email} role={role} disabled={disabled} />
        </TableCell>
      </TableRow>

      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto' showCloseButton={isMobile}>
        {isPending && (
          <div className='flex items-center justify-center'>
            <Spinner />
          </div>
        )}
        {!isPending && !user && <EmptyDataUser />}
        {!isPending && user && (
          <>
            <DialogHeader>
              <DialogTitle className='text-2xl capitalize'>{role?.toLowerCase()} Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className='space-y-6 mt-4'>
              {/* Profile Section */}
              <div className='flex items-start gap-5'>
                <div className='relative'>
                  <Avatar className={'w-20 h-20 border-2 border-primary'}>
                    <AvatarImage src={user?.photo_url} />
                    <AvatarFallback>{getInitials(user?.last_name ?? '')}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex-1 space-y-0.5'>
                  <h3 className='text-xl font-semibold'>
                    {user?.first_name} {user?.last_name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{description}</p>
                  <p className='text-sm text-muted-foreground'>{user?.email}</p>
                </div>
              </div>
              <Separator />
              {/* Basic Information */}
              <div>
                <h4 className='font-semibold mb-3 text-lg'>Basic Information</h4>
                {patient && <PatientBasicInfo patient={patient} />}
                {doctor && (
                  <div className='grid grid-cols-2 gap-4'>
                    <InfoItem label='Phone' value={doctor?.phone} />
                    <InfoItem label='Address' value={doctor?.address} />
                    <InfoItem label='License Number' value={doctor?.license_number} />
                    <InfoItem label='Specialization' value={doctor?.specialization} />
                    <InfoItem label='Department' value={doctor?.department || 'N/A'} />
                    <InfoItem label='Status' value={doctor?.availability_status || 'N/A'} />
                  </div>
                )}
              </div>
              {/* Patient Specific Information */}
              {patient && (
                <>
                  <div>
                    <h4 className='font-semibold mb-3 text-lg'>Emergency Contact</h4>
                    <PatientEmergencyContact patient={patient} />
                  </div>

                  <div>
                    <h4 className='font-semibold mb-3 text-lg'>Medical Information</h4>
                    <PatientMedicalInfo patient={patient} />
                  </div>
                </>
              )}
              {/* Doctor Specific Information */}
              {doctor && doctor.working_days && (
                <div>
                  <h4 className='font-semibold mb-3 text-lg'>Working Schedule</h4>
                  <div className='space-y-2 space-x-2'>
                    {doctor?.working_days?.map((item) => (
                      <Badge key={item.id}>{item.day}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <Separator />
              <Timestamps createdAt={user?.created_at ?? ''} updatedAt={user?.updated_at ?? ''} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
