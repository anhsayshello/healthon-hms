import z from 'zod'

export const AppointmentFormSchema = z.object({
  doctor_id: z.string().nonempty('Please select doctor'),
  type: z.string().nonempty('Type of appointment is required'),
  appointment_date: z.date(),
  time: z.string().nonempty('Time is required'),
  note: z.string().max(300).optional()
})
