import type { Currency } from './index.type'
import type { MedicalRecord } from './medical-record.type'
import type { LabBill } from './payment.type'
import type { Staff } from './staff.type'

export type LabTestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export enum LabTestStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

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
