import z from 'zod'

export const PrescriptionFormSchema = (stock_quantity: number) =>
  z.object({
    medication_id: z.coerce.number('Please select a medication first.').positive('Please select a valid medication'),
    quantity: z.coerce
      .number('Quantity is required')
      .int('Quantity must be an integer')
      .positive('Quantity must be at least 1')
      .max(stock_quantity, `Prescription quantity cannot exceed available stock (${stock_quantity}) units`),
    dosage: z.string().trim().nonempty('Dosage is required').max(100, 'Dosage must not exceed 100 characters'),
    frequency: z.string().trim().nonempty('Frequency is required').max(100, 'Frequency must not exceed 100 characters'),
    duration: z.string().trim().nonempty('Duration is required').max(100, 'Duration must not exceed 100 characters'),
    instructions: z.string().max(500, 'Instructions must not exceed 500 characters').optional()
  })
