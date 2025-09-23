import type { UserCredential } from 'firebase/auth'

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
