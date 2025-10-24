import doctorApi from '@/apis/doctor.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { CalendarPlus2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import type z from 'zod'
import { AppointmentFormSchema } from '@/lib/schemas/appointment-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import CustomField from '../shared/custom-field'
import { APPOINTMENT_TYPE } from '@/lib/schemas'
import { useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import UserInfo from '../shared/user-info'
import { Spinner } from '../ui/spinner'
import appointmentApi from '@/apis/appointment.api'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'
import { type Doctor } from '@/types/doctor.type'

export default function BookAppoinment() {
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>()
  const user = useAuthStore((state) => state.user)

  const { data } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => doctorApi.getDoctors()
  })
  const dataDoctors = useMemo(() => data?.data.data, [data])

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: appointmentApi.createNewAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', 'appointment'] })
      setOpen(false)
      toast.success('Appointment create successfully')
    }
  })

  const form = useForm<z.infer<typeof AppointmentFormSchema>>({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      doctor_id: '',
      appointment_date: new Date(),
      time: '08:00:00',
      type: '',
      note: ''
    }
  })

  const onSubmit = (data: z.infer<typeof AppointmentFormSchema>) => {
    console.log(data.appointment_date.toISOString(), 'date')
    if (user?.uid) {
      mutate({ ...data, appointment_date: data.appointment_date.toISOString() })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus2 />
          <span>Book Appoinment</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appoinment</DialogTitle>
          <DialogDescription>
            Please fill in the appointment details below. Make sure to select an available doctor and working day before
            confirming your booking.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form id='form-create-appointment' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <CustomField
                control={form.control}
                label='Appointment Type'
                name='type'
                fieldType='select'
                placeholder='Select Appointment Type'
                options={APPOINTMENT_TYPE}
              />
              <Controller
                name='doctor_id'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <span>Doctor</span>
                      <span className='-ml-1 text-destructive text-lg leading-0'>*</span>
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        const doctor = dataDoctors?.find((d) => d.uid === value)
                        setSelectedDoctor(doctor)
                      }}
                    >
                      <SelectTrigger
                        style={{ height: 42 }}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='w-full'
                      >
                        <SelectValue placeholder={'Select Doctor'} />
                      </SelectTrigger>
                      <SelectContent>
                        {dataDoctors?.map((doctor) => (
                          <SelectItem onClick={() => setSelectedDoctor(doctor)} key={doctor.uid} value={doctor.uid}>
                            <UserInfo
                              firstName={doctor.first_name}
                              lastName={doctor.last_name}
                              photoUrl={doctor.photo_url}
                              description={doctor.specialization}
                            />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    {selectedDoctor && (
                      <div className='text-sm'>
                        Working on:{' '}
                        <span className='capitalize'>
                          {selectedDoctor.working_days?.map((item) => item.day.toLowerCase()).join(', ')}
                        </span>
                      </div>
                    )}
                  </Field>
                )}
              />
              <div className='flex items-center justify-between gap-4'>
                <CustomField
                  control={form.control}
                  label='Date'
                  name='appointment_date'
                  fieldType='date'
                  placeholder='Select Appointment Date'
                  isDob={false}
                />
                <CustomField
                  control={form.control}
                  label='Time'
                  name='time'
                  inputType='time'
                  placeholder='Enter Time'
                />
              </div>
              <CustomField
                control={form.control}
                isRequired={false}
                label='Note'
                name='note'
                fieldType='textarea'
                placeholder='Note'
              />
              <Button form='form-create-appointment' disabled={isPending}>
                {isPending && <Spinner />}
                <span>Confirm</span>
              </Button>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
