import z from 'zod'
export const MedicationForm = z.object({
  medication_name: z
    .string()
    .trim()
    .min(1, 'Medication name is required')
    .max(200, 'Medication name must not exceed 200 characters'),
  description: z.string().max(500, 'Description must not exceed 500 characters').nullable().optional(),
  unit_price: z.coerce
    .number('Unit price is required')
    .positive('Unit price must be positive')
    .multipleOf(0.01, 'Price can have at most 2 decimal places'),
  currency: z.enum(['VND', 'USD', 'EUR'], 'Currency is required'),
  unit_type: z.enum(['TABLET', 'CAPSULE', 'VIAL', 'TUBE', 'BOTTLE', 'INJECTION'], 'Please select a valid unit type'),
  manufacturer: z.string().max(200, 'Manufacturer must not exceed 200 characters'),
  stock_quantity: z.coerce
    .number('Stock quantity is required')
    .int('Stock quantity must be an integer')
    .min(0, 'Stock quantity cannot be negative')
})
