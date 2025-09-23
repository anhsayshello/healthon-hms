export type Gender = 'MALE' | 'FEMALE'

export interface Patient {
  uid: string
  first_name: string
  last_name: string
  date_of_birth: string | null
  gender: Gender
  email: string
  phone: string | null
  marital_status: string
  address: string | null
  emergency_contact_name: string
  emergency_contact_number: string
  relation: string
  blood_group: string | null
  allergies: string | null
  medical_conditions: string | null
  medical_history: string | null
  insurance_provider: string | null
  insurance_number: string | null
  privacy_consent: boolean
  service_consent: boolean
  medical_consent: boolean
  photo_url: string | null
  createdAt: string
  updatedAt: string
}
