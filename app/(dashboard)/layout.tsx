import { getCurrentUser } from '@/lib/sessionServer'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({children}: {children:React.ReactNode}) => {
    const user = await getCurrentUser()
    if(!user) redirect('/login')
  return (
    <div>
        {children}
      
    </div>
  )
}

export default Layout
