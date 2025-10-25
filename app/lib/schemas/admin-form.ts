import z from 'zod'

export const DeleteUserSchema = (uid: string) =>
  z.object({
    confirm_uid: z.literal(uid, { message: `The value does not match "${uid}"` }),
    confirm_delete: z.literal('delete user', { error: 'The value does not match “delete user”' })
  })
