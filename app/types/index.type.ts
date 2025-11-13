import type { UserCredential } from 'firebase/auth'
import type { Role } from './role.type'

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
