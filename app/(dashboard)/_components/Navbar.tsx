import Image from 'next/image'
import React from 'react'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <section className='w-full bg-green-700 py-2 px-10 font-bold flex justify-between gap-x-10 md:text-base text-sm items-center text-white'>
        <div>
            <Image src={`/mubi_logo.jpg`} width={100} height={100} alt='logo' className='rounded-full w-20'/>
        </div>
        <div className='md:flex gap-x-14 justify-between items-center hidden '>
            <div >
                <h1>Design and Implemenation of an Automated Online Course Allocation Management System</h1>
            </div>
            <div>
                <h2>Computer Science Department</h2>
            </div>
            <div className='flex flex-col items-center'>
                <h2>Welcome</h2>
                <span>Admin</span>
            </div>

        </div>
        <div className='md:hidden block'>
            <MobileNav/>
        </div>
      
    </section>
  )
}

export default Navbar
