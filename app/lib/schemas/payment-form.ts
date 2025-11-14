import formatNumber from '@/helpers/formatNumber'
import z from 'zod'

export const PaymentFormSchema = (totalAmount: number) =>
  z
    .object({
      discount: z.coerce
        .number('Discount is required')
        .nonnegative('Discount cannot be negative')
        .max(totalAmount, `Discount cannot exceed total amount ${formatNumber(totalAmount)}`),
      payment_method: z.enum(['CASH', 'CARD', 'BANK_TRANSFER'], 'Payment method is required'),
      amount_paid: z.coerce.number('Amount paid is required').nonnegative('Amount paid cannot be negative'),
      notes: z.string().max(300, 'Notes cannot exceed 300 characters').optional().or(z.literal(''))
    })
    .refine(
      (data) => {
        const amountAfterDiscount = totalAmount - data.discount
        return data.amount_paid >= amountAfterDiscount
      },
      {
        error: (issue) => {
          const input = issue.input as { discount: number }
          return {
            message: `Amount paid must be at least ${formatNumber(totalAmount - input.discount)}`
          }
        },
        path: ['amount_paid']
      }
    )
