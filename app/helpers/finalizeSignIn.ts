import authApi from '@/apis/auth.api'
import { useAuthStore } from '@/stores/useAuthStore'
import type { GoogleTokenResponse, UserCredentialExtended } from '@/types/common.type'
import type { Role } from '@/types/role.type'
import { HttpStatusCode } from 'axios'
import type { UserCredential } from 'firebase/auth'

export default async function finalizeSignIn(userCred: UserCredential) {
  const idToken = await userCred.user.getIdToken()
  const tokenRes: GoogleTokenResponse = (userCred as UserCredentialExtended)?._tokenResponse
  console.log(tokenRes, 'tokenRes')
  const res = await authApi.verifyUser({
    idToken: idToken
  })
  console.log(res, 'res')
  if (res.status === HttpStatusCode.Ok) {
    const tokenResult = await userCred.user.getIdTokenResult()
    const role = res.data.role.toLowerCase() as Role
    console.log(role)
    console.log(tokenResult)
    const user = userCred.user
    useAuthStore.getState().setAuth(idToken, user, role)
  }
  console.log(userCred)
}
