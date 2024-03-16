import { X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'
interface Props{
    toggle: () => void
}
const LogoutModal = ({toggle}:Props) => {
  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center items-center ' >
        <div className='bg-white h-fit pb-7 rounded-lg '>
            <div className="p-3 cursor-pointer" onClick={toggle}>
                <X size={30} className="ml-auto " />
            </div>
            <form className='md:w-[500px] w-full px-2'>
                <h3 className='text-center text-sm border-b font-bold'>Are you sure?</h3>
                <div className='flex gap-x-5 items-center justify-center pt-2'>
                    <div className='pt-2'>
                        <button type='submit' className='bg-blue-500 px-6 py-2 rounded-md text-white' onClick={toggle}>Cancel</button>
                    </div>
                    <div className='pt-2'>
                        <button type='submit' className='bg-red-500 px-6 py-2 rounded-md text-white' onClick={()=> signOut({redirect:false})}>Log Out</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default LogoutModal
