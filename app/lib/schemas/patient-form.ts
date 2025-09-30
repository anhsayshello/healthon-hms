import z from 'zod'

export const PatientFormSchema = z.object({
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
  date_of_birth: z.coerce.date(),
  gender: z.enum(['MALE', 'FEMALE'], 'Gender is required'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  marital_status: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'SEPARATED'], 'Marital status is required'),
  address: z.string().nonempty('Address is required'),
  emergency_contact_name: z.string().nonempty('Emergency contact name is required'),
  emergency_contact_number: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  relation: z.enum(['FATHER', 'MOTHER', 'WIFE', 'HUSBAND', 'OTHER'], 'Relation with contact person is required'),
  blood_group: z.enum(['A', 'B', 'AB', 'O']).optional(),
  allergies: z.string().optional(),
  medical_conditions: z.string().optional(),
  medical_history: z.string().optional(),
  insurance_provider: z.string().optional(),
  insurance_number: z.string().optional(),
  privacy_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, { error: 'You must agree to the privacy policy' }),
  service_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, { error: 'You must agree to the terms of service' }),
  medical_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, { error: 'You must agree to the medical treatment terms ' }),
  photoUrl: z.string().optional()
})
