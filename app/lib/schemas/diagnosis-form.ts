import z from 'zod'

export const DiagnosisFormSchema = z.object({
  symptoms: z.string().max(500, 'Symptoms must not exceed 500 characters').nonempty('Symptoms are required'),
  diagnosis: z.string().max(500, 'Diagnosis must not exceed 500 characters').nonempty('Diagnosis is required'),
  notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
  follow_up_plan: z.string().max(500, 'Follow-up plan must not exceed 500 characters').optional()
})
