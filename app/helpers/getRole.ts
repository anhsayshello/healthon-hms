import { auth } from '@/lib/firebase/client'
import type { Role } from '@/types/role.type'

export default async function getRole() {
  const idTokenResult = await auth.currentUser?.getIdTokenResult()
  console.log(idTokenResult)
  const role = ((await idTokenResult?.claims?.role) as Role) ?? null

  return role
}
