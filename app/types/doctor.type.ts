export interface Doctor {
  uid: string
  email: string
  first_name: string
  last_name: string
  specialization: string
  license_number: string
  phone: string
  address: string
  department?: string
  photo_url?: string
  availability_status?: string
  created_at: string
  updated_at: string
}
