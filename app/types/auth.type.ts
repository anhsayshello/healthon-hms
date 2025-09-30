import type { Role } from './role.type'

export interface AuthResponse<Data> {
  idToken: string
  role: Role
  user: Data
}
