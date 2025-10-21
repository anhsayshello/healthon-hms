import type { RoleEnum } from './role.type'

export interface Staff<Role> {
  uid: string
  email: string
  first_name: string
  last_name: string
  phone: string
  address: string
  role: Role
  department?: string
  license_number?: string
  photo_url?: string
  created_at: string
  updated_at: string
}

export type Nurse = Staff<RoleEnum.NURSE>
export type Cashier = Staff<RoleEnum.CASHIER>
export type LabTechnician = Staff<RoleEnum.LAB_TECHNICIAN>
