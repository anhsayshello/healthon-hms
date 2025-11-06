import authApi from '@/apis/auth.api'
import path from '@/constants/path'
import { actionCodeSettings } from '@/lib/firebase/client'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserCredential } from '@/stores/useUserCredentialStore'
import type { GoogleTokenResponse, UserCredentialExtended } from '@/types/index.type'
import type { Role } from '@/types/role.type'
import { HttpStatusCode } from 'axios'
import { FirebaseError } from 'firebase/app'
import { sendEmailVerification, type UserCredential } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function useVerifyUser() {
  const navigate = useNavigate()
  const { setIdToken, setUser, setRole } = useAuthStore()
  const setUserCred = useUserCredential((state) => state.setUserCred)

  const verifyUser = async (userCred: UserCredential) => {
    if (!userCred.user.emailVerified) {
      try {
        await sendEmailVerification(userCred.user, actionCodeSettings)
        navigate({ pathname: path.emailVerification })
      } catch (error) {
        if (error instanceof FirebaseError) {
          const errorMessage = error.message
          toast.error(errorMessage)
        }
        console.log(error)
      }
      return
    }

    const idToken = await userCred.user.getIdToken()
    const res = await authApi.verifyUser(idToken)
    console.log(res, 'res')

    if (res.status !== HttpStatusCode.Ok) return
    const idTokenResult = await userCred.user.getIdTokenResult()
    console.log(idTokenResult)
    //
    const userData = res.data.data
    console.log(userData)
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
    setIdToken(idToken)
    if (!role) {
      navigate({ pathname: path.patient.register })
    } else {
      setUser(userData)
      setRole(role)
    }
  }

  return verifyUser
}
