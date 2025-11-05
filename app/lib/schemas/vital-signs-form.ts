import { z } from 'zod'

export const VitalSignsSchema = z.object({
  body_temperature: z.coerce.number().min(30, 'Body temperature too low').max(45, 'Body temperature too high'),
  systolic: z.coerce.number('Systolic pressure is required').min(50).max(250),
  diastolic: z.coerce.number('Diastolic pressure is required').min(30).max(150),
  heart_rate: z.string('Heart rate is required').regex(/^\d+$/, 'Heart rate must be a coerce.number string'),
  respiratory_rate: z.coerce.number().min(5).max(60).optional(),
  oxygen_saturation: z.coerce.number().min(50).max(100).optional(),
  weight: z.coerce.number('Weight is required').min(1).max(500),
  height: z.coerce.number('Height is required').min(30).max(250)
})
