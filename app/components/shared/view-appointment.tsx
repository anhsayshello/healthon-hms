import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import appointmentApi from '@/apis/appointment.api'
import { Calendar, Clock, User, FileText, Stethoscope } from 'lucide-react'
import Spinner from './spinner'
import formatDate from '@/helpers/formatDate'
import AppointmentStatusIndicator from './appointment-status-indicator'
import Avatar from './avatar'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'

export default function ViewAppointment({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentApi.getAppointmentDetail(id),
    enabled: open
  })

  const dataAppointment = data?.data.data

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='text-xs' size='sm'>
          View
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full md:max-w-2xl md:max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>Appointment Details</DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className='flex items-center justify-center py-8'>
            <Spinner />
          </div>
        ) : dataAppointment ? (
          <div className='space-y-5'>
            {/* Status & Type */}
            <div className='flex items-center gap-2'>
              <AppointmentStatusIndicator status={dataAppointment.status} />
              <Badge variant='secondary' className='py-1 px-2 capitalize bg-purple-600/15 text-purple-600'>
                {dataAppointment.type}
              </Badge>
            </div>

            {/* Appointment Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold'>Appointment Information</h3>
              <div className='space-y-2.5 text-sm'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-muted-foreground' />
                  <span className='text-muted-foreground'>Date:</span>
                  <span className='font-medium'>{formatDate(dataAppointment?.appointment_date)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4 text-muted-foreground' />
                  <span className='text-muted-foreground'>Time:</span>
                  <span className='font-medium'>{dataAppointment?.time}</span>
                </div>
                {dataAppointment?.reason && (
                  <div className='flex items-start gap-2'>
                    <FileText className='w-4 h-4 text-muted-foreground mt-0.5' />
                    <span className='text-muted-foreground'>Reason:</span>
                    <span className='font-medium flex-1'>{dataAppointment?.reason}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Doctor Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold flex items-center gap-2'>
                <Stethoscope className='w-4 h-4' />
                Doctor
              </h3>
              <div className='flex items-start gap-3'>
                <Avatar url={dataAppointment?.doctor?.photo_url} name={dataAppointment?.doctor?.last_name} />
                <div className='space-y-0.5'>
                  <p className='font-medium'>
                    Dr. {dataAppointment?.doctor?.first_name} {dataAppointment?.doctor?.last_name}
                  </p>
                  <p className='text-xs text-gray-600'>{dataAppointment?.doctor?.specialization}</p>
                  <p className='text-xs text-gray-600'>ID: {dataAppointment?.doctor?.uid}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Patient Info */}
            <div className='space-y-3'>
              <h3 className='text-sm font-semibold flex items-center gap-2'>
                <User className='w-4 h-4' />
                Patient
              </h3>
              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div className='col-span-2'>
                  <p className='text-muted-foreground text-xs mb-1'>Patient ID</p>
                  <p className='font-medium text-xs'>{dataAppointment?.patient?.uid}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs mb-1'>Name</p>
                  <p className='font-medium'>
                    {dataAppointment?.patient?.first_name} {dataAppointment?.patient?.last_name}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs mb-1'>Date of Birth</p>
                  <p className='font-medium'>{formatDate(dataAppointment?.patient?.date_of_birth)}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs mb-1'>Gender</p>
                  <p className='font-medium capitalize'>{dataAppointment?.patient.gender.toLocaleLowerCase()}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs mb-1'>Phone</p>
                  <p className='font-medium flex items-center gap-1'>{dataAppointment?.patient?.phone}</p>
                </div>
                <div className='col-span-2'>
                  <p className='text-muted-foreground text-xs mb-1'>Address</p>
                  <p className='font-medium flex items-start gap-1'>{dataAppointment?.patient?.address}</p>
                </div>
              </div>
            </div>

            {/* Note */}
            {dataAppointment.note && (
              <>
                <Separator />
                <div className='space-y-2'>
                  <h3 className='text-sm font-semibold'>Notes</h3>
                  <p className='text-sm leading-relaxed'>{dataAppointment.note}</p>
                </div>
              </>
            )}

            {/* Footer */}
            <Separator />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Created: {new Date(dataAppointment.created_at).toLocaleString('en-US')}</span>
              <span>Updated: {new Date(dataAppointment.updated_at).toLocaleString('en-US')}</span>
            </div>
          </div>
        ) : (
          <div className='text-center py-8 text-sm text-muted-foreground'>Appointment not found</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
