import z from 'zod'

export const StaffFormSchema = z.object({
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
  phone: z.string().min(10).max(20),
  address: z.string().nonempty('Address is required'),
  department: z.string().trim().max(100, 'Department name cannot exceed 100 characters').optional(),
  license_number: z
    .string()
    .trim()
    .min(2, 'License number must be at least 2 characters')
    .max(50, 'License number cannot exceed 50 characters'),
  photo_url: z.url('Please enter a valid URL').or(z.literal('')),
  role: z.enum(['ADMIN', 'NURSE', 'LAB_TECHNICIAN', 'CASHIER'], 'Please select an appropriate role')
})
