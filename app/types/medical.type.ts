import type { Appointment } from './appointment.type'
import type { Doctor } from './doctor.type'
import type { LabBill, LabTest } from './lab.type'
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
  medication_bills?: MedicationBill[]
}

export interface MedicalRecord {
  id: number
  patient_id: string
  appointment_id: number
  doctor_id: string
  treatment_plan?: string
  lab_request?: string
  notes?: string
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  lab_test?: LabTest[]
  vital_signs?: VitalSigns[]
  diagnosis?: Diagnosis[]
  prescriptions?: Prescription[]
}

export interface VitalSigns {
  id: number
  patient_id: string
  medical_id: number
  body_temperature: number
  systolic: number
  diastolic: number
  heart_rate: number
  respiratory_rate?: number
  oxygen_saturation?: number
  weight: number
  height: number
  created_at: string
  updated_at: string

  medical_record?: MedicalRecord
}

export interface Diagnosis {
  id: number
  patient_id: string
  medical_id: number
  doctor_id: string
  symptoms: string
  diagnosis: string
  notes?: string
  follow_up_plan?: string
  created_at: string
  updated_at: string

  doctor?: Doctor
  medical?: MedicalRecord
}

export interface Medication {
  id: number
  medication_name: string
  description?: string | null
  unit_price: number
  unit_type: string
  manufacturer?: string | null
  stock_quantity: number
  created_at: Date
  updated_at: Date

  prescriptions?: Prescription[]
  medication_bills?: MedicationBill[]
}

export interface Prescription {
  id: number
  medical_id: number
  medication_id: number
  quantity: number
  dosage: string
  frequency: string
  duration: string
  instructions?: string | null
  created_at: Date
  updated_at: Date

  medical_record?: MedicalRecord
  medication?: Medication
}

export interface MedicationBill {
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
