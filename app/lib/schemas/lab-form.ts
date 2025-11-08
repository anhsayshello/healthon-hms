import z from 'zod'

export const LabServiceForm = z.object({
  service_name: z.string().max(200, 'Service name must not exceed 200 characters').nonempty('Service name is requied'),
  description: z.string().max(300, 'Description must not exceed 300 characters').nonempty('Description is requied'),
  price: z.coerce.number('Price is required'),
  currency: z.enum(['VND', 'USD', 'EUR'], 'Currency is required')
})

export const LabRequestForm = z.object({
  service_id: z.coerce.number('Lab service is required.')
})

export const LabTestForm = z.object({
  result: z.string().max(300, 'Result must not excedd 300 characters').nonempty('Lab result is required.')
})
