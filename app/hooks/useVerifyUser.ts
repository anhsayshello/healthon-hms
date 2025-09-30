import authApi from '@/apis/auth.api'
import path from '@/constants/path'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserCredential } from '@/stores/useUserCredentialStore'
import type { GoogleTokenResponse, UserCredentialExtended } from '@/types/common.type'
import type { Role } from '@/types/role.type'
import { HttpStatusCode } from 'axios'
import type { UserCredential } from 'firebase/auth'
import { useNavigate } from 'react-router'

export default function useVerifyUser() {
  const navigate = useNavigate()
  const { setIdToken, setUser, setRole } = useAuthStore()
  const setUserCred = useUserCredential((state) => state.setUserCred)

  const verifyUser = async (userCred: UserCredential) => {
    const idToken = await userCred.user.getIdToken()
    const res = await authApi.verifyUser(idToken)
    console.log(res, 'res')

    if (res.status === HttpStatusCode.Ok) {
      const idTokenResult = await userCred.user.getIdTokenResult()
      console.log(idTokenResult)
      //
      const userData = res.data.user
      const role = idTokenResult.claims?.role as Role
      //
      const tokenRes: GoogleTokenResponse = (userCred as UserCredentialExtended)?._tokenResponse
      console.log(tokenRes, 'tokenRes')
      const email = tokenRes.email
      const firstName = tokenRes.firstName
      const lastName = tokenRes.lastName
      const photoUrl = tokenRes.photoUrl
      setUserCred({ email, firstName, lastName, photoUrl })
      //
      if (role) {
        setIdToken(idToken)
        setUser(userData)
        setRole(role)
      } else {
        setIdToken(idToken)
        navigate({ pathname: path.patient.register })
      }
    }
  }

  return verifyUser
}
