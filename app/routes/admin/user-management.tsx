import type { Route } from '../admin/+types/user-management.tsx'
import UserInfo from '@/components/shared/user-info'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/useAuthStore'
import adminApi from '@/apis/admin.api'
import { useEffect, useMemo, useState } from 'react'
import CardWrapper from '@/components/shared/card-wrapper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import type { Doctor } from '@/types/doctor.type'
import type { Patient } from '@/types/patient.type'
import Timestamps from '@/components/shared/time-stamps'
import { Separator } from '@/components/ui/separator'
import { PatientBasicInfo, PatientEmergencyContact, PatientMedicalInfo } from '@/components/shared/patient-information'
import InfoItem from '@/components/shared/info-item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/components/shared/profile-avatar'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { User, UserPlus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import NewDoctor from './new-doctor'
import type { FirebaseUserRecord } from '@/types/index.type'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { RoleEnum } from '@/types/role.type'
import UserAction from './user-action'
import { useInView } from 'react-intersection-observer'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'User Management' }, { name: 'description', content: 'Welcome to React Router!' }]
}

const columns = [
  {
    header: 'User uid',
    key: 'uid'
  },
  { header: 'User Info', key: 'name' },
  {
    header: 'Role',
    key: 'role'
  },
  {
    header: 'Email',
    key: 'email'
  },
  {
    header: 'Email Verified',
    key: 'email-verified'
  },
  {
    header: 'Last login',
    key: 'last-login'
  },
  {
    header: 'Action',
    key: 'action'
  }
]

export default function UserManagement() {
  const user = useAuthStore((state) => state.user)
  const { ref, inView } = useInView()

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['admin', 'firebase-users', user?.uid],
    queryFn: ({ pageParam }) => adminApi.getUsers(pageParam),
    getNextPageParam: (lastPage) => lastPage.data.nextPageToken,
    placeholderData: keepPreviousData,
    initialPageParam: undefined as string | undefined
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])
  console.log(data, 'data')

  const dataUsers = useMemo(() => data?.pages.flatMap((page) => page?.data?.data) ?? [], [data])
  console.log(dataUsers)

  return (
    <CardWrapper>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            className='aspect-square w-8'
            src='https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png'
            loading='lazy'
            alt=''
          />
          <div className='text-xl font-semibold'>Firebase User Management</div>
        </div>
        <CreateUser />
      </div>

      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {!dataUsers.length && (
          <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
        )}

        <TableBody>
          {dataUsers.map((user) => (
            <UserDetail key={user.uid} data={user} />
          ))}
        </TableBody>
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

function CreateUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          <span>Create User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-2xl max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='doctor'>
          <TabsList>
            <TabsTrigger value='doctor'>Create Doctor</TabsTrigger>
            <TabsTrigger value='staff'>Create Staff</TabsTrigger>
          </TabsList>
          <TabsContent value='doctor'>
            <NewDoctor />
          </TabsContent>
          <TabsContent value='staff'>Create staff</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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
  const [open, setOpen] = useState(false)

  const { data: dataUser, isPending } = useQuery({
    queryKey: ['admin', 'user-detail', data.uid],
    queryFn: () => adminApi.getUserById(data.uid),
    enabled: open
  })
  const user = useMemo(() => dataUser?.data.data, [dataUser])
  const role = useMemo(() => data.customClaims?.role, [data])
  const isPatient = useMemo(() => role === RoleEnum.PATIENT && user, [role, user])
  const isDoctor = useMemo(() => role === RoleEnum.DOCTOR && user, [role, user])
  const patient = useMemo(() => (isPatient ? (user as Patient) : null), [isPatient, user])
  const doctor = useMemo(() => (isDoctor ? (user as Doctor) : null), [isDoctor, user])
  console.log(doctor)
  const description = useMemo(() => patient?.gender || doctor?.specialization || '', [patient, doctor])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TableRow key={data.uid}>
        <DialogTrigger asChild>
          <TableCell className='text-[13px] cursor-pointer'>{data?.uid}</TableCell>
        </DialogTrigger>
        <TableCell>
          <UserInfo photoUrl={data?.photoURL} firstName={''} lastName={data?.displayName ?? ''} />
        </TableCell>
        <TableCell className='capitalize'>{role?.toLowerCase() ?? 'Null'}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.emailVerified ? 'True' : 'False'}</TableCell>
        <TableCell>{data.metadata.lastSignInTime}</TableCell>
        <TableCell>
          <UserAction uid={data.uid} />
        </TableCell>
      </TableRow>

      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
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
