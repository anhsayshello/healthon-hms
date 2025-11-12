import type { Appointment } from './appointment.type'
import type { Service } from './lab.type'
import type { Medication } from './medication.type'
import type { Patient } from './patient.type'

type PaymentMethod = 'CASH' | 'CARD'

type PaymentStatus = 'PAID' | 'UNPAID' | 'PART'

export interface Payment {
  id: number
  patient_id: string
  appointment_id: number
  bill_date: string
  payment_date: string
  discount: number
  total_amount: number
  amount_paid: number
  payment_method: PaymentMethod
  status: PaymentStatus
  receipt_number: string
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  lab_bills?: LabBill[]
  prescription_bills?: PrescriptionBill[]
}

export interface PrescriptionBill {
  id: number
  payment_id: number
  medication_id: number
  quantity: number
  unit_cost: number
  total_cost: number
  created_at: Date
  updated_at: Date

  medication?: Medication
  payment?: Payment
}

export interface LabBill {
  id: number
  bill_id: number
  service_id: number
  service_date: string
  quantity: number
  unit_cost: number
  total_cost: number
  created_at: string
  updated_at: string

  service?: Service
  payment?: Payment
}
