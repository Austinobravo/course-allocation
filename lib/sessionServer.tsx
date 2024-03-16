import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export function sessionServer() {
  return getServerSession(options)
}

export async function getCurrentUser(){
    const session = await sessionServer()
    return session?.user
}
