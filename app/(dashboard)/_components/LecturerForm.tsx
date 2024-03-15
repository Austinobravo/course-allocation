import { X } from 'lucide-react'
import React from 'react'
interface Props {
    toggle: () => void
}
const LecturerForm = ({toggle}:Props) => {
  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center ' >
    <div className='bg-white w-full'>
        <div className="p-3 cursor-pointer" onClick={toggle}>
            <X size={30} className="ml-auto " />
        </div>
        <form className='md:w-[500px] w-full px-2'>
            <h3 className='text-center text-2xl border-b font-bold'>Add New Lecturer</h3>
            <div className='flex flex-col pt-2 '>
                <label className='font-bold'>Title</label>
                <select className='border p-2 focus:border-blue-500 rounded-md outline-none' required>
                    <option>-- Select --</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                    <option>Dr</option>
                    <option>Prof</option>
                </select>
            </div>
            <div className='flex flex-col pt-2 '>
                <label className='font-bold'>First Name</label>
                <input type='text' id='firstName' name='firstName' placeholder="What is the Lecturer's first name?" className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
            </div>
            <div className='flex flex-col pt-2 '>
                <label className='font-bold'>Last Name</label>
                <input type='text' id='lastName' name='lastName' placeholder="What is the Lecturer's  last name?" className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
            </div>
            <div className='flex flex-col pt-2 '>
                <label className='font-bold'>Courses Of Specialization</label>
                <select className='border p-2 focus:border-blue-500 rounded-md outline-none' required>
                    <option>-- Select --</option>
                    <option>Software Development</option>
                    <option>Computer Science</option>
                </select>
            </div>
            <div className='pt-2'>
                <button type='submit' className='bg-blue-500 px-6 py-2 rounded-md text-white'>Create</button>
            </div>
        </form>

    </div>
  
</section>
  )
}

export default LecturerForm
