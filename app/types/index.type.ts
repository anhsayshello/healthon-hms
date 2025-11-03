import type { UserCredential } from 'firebase/auth'
import type { Role } from './role.type'
import type { Appointment } from './appointment.type'
import type { Patient } from './patient.type'
import type { Doctor } from './doctor.type'

export interface GoogleTokenResponse {
  federatedId: string
  providerId: string
  email: string
  emailVerified: boolean
  firstName: string
  fullName: string
  lastName: string
  photoUrl: string
  localId: string
  displayName: string
  idToken: string
  context: string
  oauthAccessToken: string
  oauthExpireIn: number
  refreshToken: string
  expiresIn: string
  oauthIdToken: string
  rawUserInfo: string
  kind: string
}
export interface UserCredentialExtended extends UserCredential {
  _tokenResponse: GoogleTokenResponse
}

export interface SearchQueryParams {
  query?: string
  limit?: string
  page?: string
}

export interface CustomClaims {
  role: Role
}

export interface FirebaseUserRecord {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  emailVerified: boolean
  disabled: boolean
  customClaims?: CustomClaims
  metadata: {
    creationTime: string
    lastSignInTime?: string
    lastRefreshTime?: string
  }
  providerData: {
    uid: string
    providerId: string
    displayName?: string
    email?: string
    photoURL?: string
  }[]
  tokensValidAfterTime?: string
}

export interface PaginatedResponse<Data> {
  data: Data[]
  totalPages: number
  currentPage: number
  totalRecords: number
}

type PaymentMethod = 'CASH' | 'CARD'

type PaymentStatus = 'PAID' | 'UNPAID' | 'PART'

export interface Payment {
  id: number
  bill_id?: number
  patient_id: string
  appointment_id: number
  bill_date: string
  payment_date: string
  discount: number
  total_amount: number
  amount_paid: number
  payment_method: PaymentMethod
  status: PaymentStatus
  receipt_number: number
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  bills?: PatientBills[]
}

export interface PatientBills {
  id: number
  bill_id: number
  service_id: number
  service_date: string
  quantity: number
  unit_cost: number
  total_cost: number
  created_at: string
  updated_at: string

  service?: Services
  payment?: Payment
}

export interface LabTest {
  id: number
  record_id: number
  test_date: string
  result: string
  status: string
  notes: string
  service_id: number
  created_at: string
  updated_at: string

  services?: Services
  medical_record?: MedicalRecords
}

export interface MedicalRecords {
  id: number
  patient_id: string
  appointment_id: number
  doctor_id: string
  treatment_plan?: string
  prescriptions?: string
  lab_request?: string
  notes?: string
  created_at: string
  updated_at: string

  appointment?: Appointment
  patient?: Patient
  lab_test?: LabTest[]
  vital_signs?: VitalSigns[]
  diagnosis?: Diagnosis[]
}

export interface VitalSigns {
  id: number
  patient_id: string
  medical_id: number
  body_temperature: number
  systolic: number
  diastolic: number
  heartRate: string
  respiratory_rate?: number
  oxygen_saturaion?: number
  weight: number
  height: number
  created_at: string
  updated_at: string

  medical_record?: MedicalRecords
}

export interface Diagnosis {
  id: number
  patient_id: string
  medical_id: number
  doctor_id: string
  symptoms: string
  diagnosis: string
  notes?: string
  prescribed_medications?: string
  follow_up_plan?: string
  created_at: string
  updated_at: string

  doctor?: Doctor
  medical?: MedicalRecords
}

export interface Services {
  id: number
  service_name: string
  description: string
  price: number
  created_at: string
  updated_at: string

  labtest?: LabTest
  bills?: PatientBills[]
}
