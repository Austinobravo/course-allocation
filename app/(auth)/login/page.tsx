import Image from 'next/image'
import React from 'react'
import LoginForm from './_components/LoginForm'

const page = () => {
  return (
    <section className='flex bg-blue-100 items-center justify-center flex-col h-screen border my-auto w-full'>
        <div>
            <Image src={`/mubi_logo.jpg`} width={100} height={100} alt='logo' className='rounded-full w-20'/>
        </div>
        <LoginForm/>
    </section>
  )
}

export default page
