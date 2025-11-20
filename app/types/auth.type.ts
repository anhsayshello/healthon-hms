import type { Role } from './role.type'

export interface AuthResponse<Data> {
  role: Role
  data: Data
}
