export type Role = 'ADMIN' | 'PATIENT' | 'DOCTOR' | 'NURSE' | 'LAB_TECHNICIAN' | 'CASHIER'
export type StaffRole = Exclude<Role, 'PATIENT' | 'DOCTOR'>

export enum RoleEnum {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  CASHIER = 'CASHIER'
}
