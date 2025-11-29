import type { Role } from './role.type'

export type Currency = 'VND' | 'USD' | 'EUR'

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
