import type { Appointment } from '@/types/appointment.type'
import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Payment } from '@/types/payment.type'
import http from '@/utils/http'

const cashierApi = {
  getAppointmentsForPayment: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<Appointment>>('cashier/payments', { params }),
  initializePayment: (appointment_id: number) => http.post<Payment>('cashier/payments', { appointment_id }),
  getPaymentById: (id: string) => http.get<Payment>(`cashier/payments/${id}`),
  processPayment: ({
    id,
    props
  }: {
    id: number
    props: Pick<Payment, 'payment_method' | 'amount_paid' | 'discount' | 'notes'>
  }) => http.patch(`cashier/payments/${id}/process`, props),
  getReceipts: (params: SearchQueryParams) => http.get<PaginatedResponse<Payment>>('cashier/receipts', { params }),
  getReceiptById: (id: number) => http.get<Payment>(`cashier/receipts/${id}`)
}

export default cashierApi
