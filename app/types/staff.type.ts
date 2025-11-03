import type { StaffRole } from './role.type'
type Status = 'ACTIVE' | 'INACTIVE' | 'DORMANT'

export interface Staff {
  uid: string
  email: string
  first_name: string
  last_name: string
  phone: string
  address: string
  role: StaffRole
  status: Status
  department?: string
  license_number?: string
  photo_url?: string
  created_at: string
  updated_at: string
}
