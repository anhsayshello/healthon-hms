import type { MedicalRecord, Payment } from './medical.type'
import type { Staff } from './staff.type'

export type LabTestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export enum LabTestStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export type Currency = 'VND' | 'USD' | 'EUR'

export interface Service {
  id: number
  service_name: string
  description: string
  price: number
  currency: Currency
  created_at: string
  updated_at: string

  lab_test?: LabTest[]
  lab_bills?: LabBill[]
}

export interface LabTest {
  id: number
  service_id: number
  medical_id: number
  technician_id?: string
  test_date: string
  result?: string
  status: LabTestStatus
  notes: string
  created_at: string
  updated_at: string

  technician?: Staff
  service?: Service
  medical_record?: MedicalRecord
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
