import type { Appointment } from './appointment.type'
import type { Doctor } from './doctor.type'
import type { LabTest } from './lab.type'
import type { Medication } from './medication.type'
import type { Patient } from './patient.type'
import type { PrescriptionBill } from './payment.type'

export interface MedicalRecord {
  id: number
  patient_id: string
  appointment_id: number
  doctor_id: string
  treatment_plan?: string
  notes?: string
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  doctor?: Doctor
  lab_tests?: LabTest[]
  vital_signs?: VitalSigns[]
  diagnoses?: Diagnosis[]
  prescriptions?: Prescription[]
}

export interface VitalSigns {
  id: number
  medical_record_id: number
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
  medical_record_id: number
  doctor_id: string
  symptoms: string
  diagnosis: string
  notes?: string
  follow_up_plan?: string
  created_at: string
  updated_at: string

  doctor?: Doctor
  medical_record?: MedicalRecord
}

export interface Prescription {
  id: number
  medical_record_id: number
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
  bills: PrescriptionBill
}
