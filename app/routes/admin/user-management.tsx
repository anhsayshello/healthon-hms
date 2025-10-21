import type { Route } from './+types/admin/user-management'
import UserInfo from '@/components/shared/user-info'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/useAuthStore'
import adminApi from '@/apis/admin.api'
import { useMemo } from 'react'
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

export function meta({}: Route.MetaArgs) {
  return [{ title: 'User Management' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function UserManagement() {
  const user = useAuthStore((state) => state.user)
  const { data, isPending } = useQuery({
    queryKey: ['admin', 'user-management', user?.uid],
    queryFn: () => adminApi.getUsers()
  })
  console.log(data)

  const dataPatients = useMemo(() => data?.data.patients, [data])
  const dataDoctors = useMemo(() => data?.data.doctors, [data])

  const columns = [
    { header: 'User Info', key: 'name' },
    {
      header: 'Role',
      key: 'role'
    },
    {
      header: 'Phone',
      key: 'phone'
    },
    {
      header: 'Email',
      key: 'email'
    },
    {
      header: 'Address',
      key: 'address'
    }
  ]

  return (
    <CardWrapper>
      <div className='text-xl font-semibold'>User Management</div>
      <Table className='bg-background'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {(!dataPatients || !dataDoctors) && (
          <TableCaption className='text-center'>{isPending ? <Spinner /> : 'No data found'}</TableCaption>
        )}
        <TableBody>
          {dataPatients && dataPatients.map((patient) => <UserDetail patient={patient} />)}
          {dataDoctors && dataDoctors.map((doctor) => <UserDetail doctor={doctor} />)}
        </TableBody>
      </Table>
    </CardWrapper>
  )
}

function UserDetail({ patient, doctor }: { patient?: Patient; doctor?: Doctor }) {
  const user = patient ?? doctor
  if (!user) return null

  const roleLabel = patient ? 'Patient' : 'Doctor'
  const description = patient ? patient.gender : doctor?.specialization

  console.log(doctor)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow key={user.uid} className='cursor-pointer hover:bg-muted/50'>
          <TableCell>
            <UserInfo
              photoUrl={user.photo_url}
              firstName={user.first_name}
              lastName={user.last_name}
              description={description as string}
            />
          </TableCell>
          <TableCell>{roleLabel}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.address}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </DialogTrigger>

      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{roleLabel} Details</DialogTitle>
          <DialogDescription>
            Complete information for {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 mt-4'>
          {/* Profile Section */}
          <div className='flex items-start gap-5'>
            <div className='relative'>
              <Avatar className={'w-20 h-20 border-2 border-primary'}>
                <AvatarImage src={user.photo_url} />
                <AvatarFallback>{getInitials(user.last_name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className='flex-1 space-y-0.5'>
              <h3 className='text-xl font-semibold'>
                {user.first_name} {user.last_name}
              </h3>
              <p className='text-sm text-muted-foreground'>{description}</p>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
            </div>
          </div>
          <Separator />
          {/* Basic Information */}
          <div>
            <h4 className='font-semibold mb-3 text-lg'>Basic Information</h4>
            {patient && <PatientBasicInfo patient={patient} />}
            {doctor && (
              <div className='grid grid-cols-2 gap-4'>
                <InfoItem label='Phone' value={doctor.phone} />
                <InfoItem label='Address' value={doctor.address} />
                <InfoItem label='License Number' value={doctor.license_number} />
                <InfoItem label='Specialization' value={doctor.specialization} />
                <InfoItem label='Department' value={doctor.department || 'N/A'} />
                <InfoItem label='Status' value={doctor.availability_status || 'N/A'} />
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
                {doctor.working_days.map((item) => (
                  <Badge key={item.id}>{item.day}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <Separator />
          <Timestamps createdAt={user.created_at} updatedAt={user.updated_at} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
