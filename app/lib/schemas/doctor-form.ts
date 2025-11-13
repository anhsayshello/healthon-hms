import z from 'zod'

export const DoctorFormSchema = z.object({
  email: z.email(),
  first_name: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, "First name can'\t be more than 50 characters"),
  last_name: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, "Last name can'\t be more than 50 characters"),
  specialization: z
    .string()
    .trim()
    .min(2, 'Specialization must be at least 2 characters')
    .max(50, 'Specialization cannot exceed 50 characters'),
  license_number: z
    .string()
    .trim()
    .min(2, 'License number must be at least 2 characters')
    .max(50, 'License number cannot exceed 50 characters'),
  phone: z.string().min(10).max(20),
  address: z.string().nonempty('Address is required'),
  department: z.string().trim().max(100, 'Department name cannot exceed 100 characters').optional(),
  photo_url: z.url('Please enter a valid URL').or(z.literal('')),
  type: z.enum(['FULL', 'PART'], 'Please select either Full-time or Part-time'),
  working_days: z
    .array(
      z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'], {
        message: 'Invalid day'
      })
    )
    .nonempty({ message: 'Please select at least one working day' }),
  start_time: z.iso.time(),
  close_time: z.iso.time()
})
// .refine(
//   (data) => dayjs(data.start_time, ['HH:mm:ss', 'HH:mm']).isBefore(dayjs(data.close_time, ['HH:mm:ss', 'HH:mm'])),
//   {
//     message: 'Closing time must be after starting time',
//     path: ['close_time']
//   }
// )
