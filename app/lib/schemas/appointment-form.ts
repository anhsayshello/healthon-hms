import z from 'zod'

export const AppointmentFormSchema = z.object({
  doctor_id: z.string().nonempty('Please select a doctor before proceeding.'),
  appointment_date: z.date(),
  time: z.iso.time(),
  type: z.string().nonempty('Please specify the type of appointment.'),
  note: z.string().max(300, 'Note must not exceed 300 characters.').optional()
})
