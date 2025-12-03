import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Calendar,
  Clock,
  User,
  FileText,
  Stethoscope,
  SquareActivity,
  SquarePen,
  Vault,
  ScanSearch,
  Syringe,
  Cctv
} from 'lucide-react'
import AppointmentStatusIndicator from './appointment-status-indicator'
import { Separator } from '../../ui/separator'
import { AppointmentStatusEnum, type AppointmentStatus } from '@/types/appointment.type'
import { Spinner } from '../../ui/spinner'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Textarea } from '../../ui/textarea'
import { cn } from '@/lib/utils'
import useRole from '@/hooks/useRole'
import Timestamps from '../../shared/time-stamps'
import PatientInformation from '../../shared/patient-information'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from 'sonner'
import formatDate from '@/helpers/formatDate'
import useUpdateAppointmentById from '@/hooks/appointment/useUpdateAppointment'
import UserInfo from '../../shared/user-info'
import { useNavigate } from 'react-router'
import path from '@/constants/path'
import useAppointmentById from '@/hooks/appointment/useAppointmentById'

export default function ViewAppointment({ id }: { id: number }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const { dataAppointment, isPending } = useAppointmentById(id, open)
  console.log(dataAppointment, 'data-app')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-full !py-1 !justify-start'>
          <ScanSearch />
          <div className='text-sm'>View</div>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={isMobile} className='w-full md:max-w-2xl max-h-[90vh] overflow-y-auto'>
        {dataAppointment ? (
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>Appointment Details</DialogTitle>
          </DialogHeader>
        ) : (
          <DialogTitle></DialogTitle>
        )}

        {isPending ? (
          <div className='flex items-center justify-center py-8'>
            <Spinner />
          </div>
        ) : dataAppointment ? (
          <div className='space-y-4 sm:space-y-5'>
            {/* Appointment Info */}
            <AppointmentInformation
              appointmentId={dataAppointment.id}
              appointmentType={dataAppointment.type}
              appointmentDate={dataAppointment.appointment_date}
              appointmentTime={dataAppointment.time}
              appointmentStatus={dataAppointment.status}
              appointmentReason={dataAppointment.reason}
              appointmentNote={dataAppointment.note}
              medicalRecordId={dataAppointment.medical_records[0]?.id}
            />

            <Separator />

            {/* Doctor Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold flex items-center gap-2'>
                <Stethoscope size={18} />
                Doctor
              </h3>
              <UserInfo
                firstName={dataAppointment.doctor.first_name}
                lastName={dataAppointment.doctor.last_name}
                photoUrl={dataAppointment.doctor.photo_url}
                description={dataAppointment.doctor.specialization}
                uid={dataAppointment.doctor.uid}
                size='lg'
              />
            </div>

            <Separator />

            {/* Patient Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold flex items-center gap-2'>
                <User size={18} />
                Patient
              </h3>
              <div className='col-span-2'>
                <p className='text-muted-foreground text-xs mb-1'>Patient ID</p>
                <p className='font-medium text-xs'>{dataAppointment?.patient?.uid}</p>
              </div>
              <PatientInformation patient={dataAppointment.patient} />
            </div>

            {/* Footer */}
            <Separator />
            <Timestamps createdAt={dataAppointment.created_at} updatedAt={dataAppointment.updated_at} />
          </div>
        ) : (
          <EmptyAppointment />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EmptyAppointment() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Vault />
        </EmptyMedia>
        <EmptyTitle>Appointment Not Found</EmptyTitle>
        <EmptyDescription>The appointment you're looking for doesn't exist or has been removed.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function AppointmentInformation({
  appointmentId,
  appointmentType,
  appointmentDate,
  appointmentTime,
  appointmentStatus,
  appointmentReason,
  appointmentNote,
  medicalRecordId
}: {
  appointmentId: number
  appointmentType: string
  appointmentDate: string
  appointmentTime: string
  appointmentStatus: AppointmentStatus
  appointmentReason: string
  appointmentNote?: string
  medicalRecordId?: number
}) {
  const navigate = useNavigate()
  const { isAdmin, isNurse } = useRole()
  const [isUpdate, setIsUpdate] = useState(false)
  const [reason, setReason] = useState(appointmentReason ?? '')
  const [status, setStatus] = useState<AppointmentStatus>(appointmentStatus)

  const { mutate, isPending } = useUpdateAppointmentById()

  const handleAction = () => {
    mutate(
      { id: appointmentId, status, reason },
      {
        onSuccess: () => toast.success('Updated appointment successfully'),
        onError: () => {
          setReason(appointmentReason ?? '')
          setStatus(appointmentStatus)
        }
      }
    )
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-6'>
        <h3 className='text-sm font-semibold'>Appointment Information</h3>
        {!isUpdate && (isAdmin || isNurse) && (
          <Button variant='ghost' onClick={() => setIsUpdate(true)} className='cursor-pointer'>
            <SquarePen size={18} />
          </Button>
        )}
      </div>
      <div className='space-y-3 text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
            <Syringe size={16} className='text-muted-foreground' />
            <span className='text-muted-foreground'>Type:</span>
          </div>
          <span className='font-medium grow capitalize'>{appointmentType}</span>
        </div>
        <div className='flex items-center'>
          <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
            <Calendar size={16} className='text-muted-foreground' />
            <span className='text-muted-foreground'>Date:</span>
          </div>
          <span className='font-medium grow'>{formatDate(appointmentDate)}</span>
        </div>
        <div className='flex items-center'>
          <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
            <Clock size={16} className='text-muted-foreground' />
            <span className='text-muted-foreground'>Time:</span>
          </div>
          <span className='font-medium grow'>{appointmentTime}</span>
        </div>
        <div className='flex items-start'>
          <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
            <SquareActivity size={16} className='text-muted-foreground' />
            <span className='text-muted-foreground'>Status:</span>
          </div>
          {!isUpdate ? (
            <AppointmentStatusIndicator status={appointmentStatus} />
          ) : (
            <div className='flex items-center gap-2 flex-wrap'>
              <Button
                variant='ghost'
                className={cn('!p-0 h-fit disabled:opacity-100 opacity-50', { 'disabled:opacity-50': isPending })}
                onClick={() => setStatus(AppointmentStatusEnum.SCHEDULED)}
                disabled={isPending || status === AppointmentStatusEnum.SCHEDULED}
              >
                <AppointmentStatusIndicator status={AppointmentStatusEnum.SCHEDULED} />
              </Button>
              <Button
                variant='ghost'
                className={cn('!p-0 h-fit disabled:opacity-100 opacity-50', { 'disabled:opacity-50': isPending })}
                onClick={() => setStatus(AppointmentStatusEnum.PENDING)}
                disabled={isPending || status === AppointmentStatusEnum.PENDING}
              >
                <AppointmentStatusIndicator status={AppointmentStatusEnum.PENDING} />
              </Button>
              <Button
                variant='ghost'
                className={cn('!p-0 h-fit disabled:opacity-100 opacity-50', { 'disabled:opacity-50': isPending })}
                onClick={() => setStatus(AppointmentStatusEnum.CANCELLED)}
                disabled={isPending || status === AppointmentStatusEnum.CANCELLED}
              >
                <AppointmentStatusIndicator status={AppointmentStatusEnum.CANCELLED} />
              </Button>
              <Button
                variant='ghost'
                className={cn('!p-0 h-fit disabled:opacity-100 opacity-50', { 'disabled:opacity-50': isPending })}
                onClick={() => setStatus(AppointmentStatusEnum.COMPLETED)}
                disabled={isPending || status === AppointmentStatusEnum.COMPLETED}
              >
                <AppointmentStatusIndicator status={AppointmentStatusEnum.COMPLETED} />
              </Button>
            </div>
          )}
        </div>

        {appointmentNote && (
          <div className='flex items-start'>
            <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
              <FileText size={16} className='text-muted-foreground mt-0.5' />
              <span className='text-muted-foreground'>Note:</span>
            </div>
            <span className='font-medium grow'>{appointmentNote}</span>
          </div>
        )}

        {!isUpdate && (
          <div className='flex items-start'>
            <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
              <FileText size={16} className='text-muted-foreground mt-0.5' />
              <span className='text-muted-foreground'>Reason:</span>
            </div>
            <span className='font-medium grow'>{appointmentReason}</span>
          </div>
        )}

        {isUpdate && (
          <div className='flex items-start'>
            <div className='shrink-0 w-21 lg:w-21.5 flex items-center gap-2'>
              <FileText size={16} className='text-muted-foreground mt-0.5' />
              <span className='text-muted-foreground'>Reason:</span>
            </div>
            <Textarea
              disabled={isPending}
              className='max-h-30 text-sm'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}

        {isUpdate && (
          <div className='flex items-center pt-3'>
            <div className='shrink-0 w-21 lg:w-21.5'></div>
            <div className='flex items-center gap-3'>
              <Button onClick={() => setIsUpdate(false)} size='sm' className='text-destructive' variant='outline'>
                Cancel
              </Button>
              <Button disabled={isPending} size='sm' onClick={handleAction}>
                {isPending && <Spinner />}
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>

      {medicalRecordId && (
        <Button
          variant={'link'}
          onClick={() => navigate({ pathname: `${path.record.medicalRecords}/${medicalRecordId}` })}
        >
          <Cctv />
          <span>View Medical Record</span>
        </Button>
      )}
    </div>
  )
}
