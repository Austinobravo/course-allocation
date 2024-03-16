import { getCurrentUser } from '@/lib/sessionServer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({children}: {children:React.ReactNode}) => {
    const user = await getCurrentUser()
    if(user) redirect('/')
  return (
    <div>
        {children}
      
    </div>
  )
}

export default AuthLayout
