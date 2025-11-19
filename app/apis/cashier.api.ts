import type { Appointment } from '@/types/appointment.type'
import type { PaginatedResponse, SearchQueryParams } from '@/types/index.type'
import type { Payment } from '@/types/payment.type'
import http from '@/utils/http'

const cashierApi = {
  getAppointmentsForBilling: (params: SearchQueryParams) =>
    http.get<PaginatedResponse<Appointment>>('cashier/billings', { params }),
  createBilling: (appointment_id: number) => http.post<Payment>('cashier/billings', { appointment_id }),
  getBillingById: (id: string) => http.get<Payment>(`cashier/billings/${id}`),
  processPayment: ({
    id,
    props
  }: {
    id: number
    props: Pick<Payment, 'payment_method' | 'amount_paid' | 'discount' | 'notes'>
  }) => http.patch(`cashier/billings/${id}/payment`, props),
  getReceipts: (params: SearchQueryParams) => http.get<PaginatedResponse<Payment>>('cashier/receipts', { params }),
  getReceiptById: (id: number) => http.get<Payment>(`cashier/receipts/${id}`),
  printReceiptPdf: (id: number) =>
    http.get<Blob>(`cashier/receipts/${id}/pdf`, {
      responseType: 'blob'
    })
}

export default cashierApi
