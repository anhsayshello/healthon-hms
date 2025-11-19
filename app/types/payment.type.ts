import type { Appointment } from './appointment.type'
import type { Service } from './lab.type'
import type { Prescription } from './medical-record.type'
import type { Patient } from './patient.type'
import type { Staff } from './staff.type'

type PaymentMethod = 'CASH' | 'CARD' | 'BANK_TRANSFER'

type PaymentStatus = 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'REFUNDED'

export enum PaymentMethodEnum {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentStatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  REFUNDED = 'REFUNDED'
}

export interface Payment {
  id: number
  patient_id: string
  appointment_id: number
  bill_date: string
  payment_date: string
  subtotal: number
  discount: number
  total_amount: number
  amount_paid: number
  refund_amount: number
  change_amount: number
  cashier_id?: string
  notes?: string

  payment_method: PaymentMethod
  status: PaymentStatus
  receipt_number: string
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  cashier?: Staff

  lab_bills?: LabBill[]
  prescription_bills?: PrescriptionBill[]
  history?: PaymentHistory
}

export interface PaymentHistory {
  id: number
  payment_id: number
  previous_status: PaymentStatus
  new_status: PaymentStatus
  changed_by: string
  notes?: string
  created_at: string
}

export interface PrescriptionBill {
  id: number
  payment_id: number
  prescription_id: number
  quantity: number
  unit_cost: number
  total_cost: number
  created_at: Date
  updated_at: Date

  prescription?: Prescription
  payment?: Payment
}

export interface LabBill {
  id: number
  bill_id: number
  service_id: number
  service_date: string
  unit_cost: number
  total_cost: number
  created_at: string
  updated_at: string

  service?: Service
  payment?: Payment
}
