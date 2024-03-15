import { X } from 'lucide-react'
import React from 'react'
interface Props {
    toggle: () => void
}
const CourseForm = ({toggle}: Props) => {
  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center ' >
        <div className='bg-white w-full'>
            <div className="p-3 cursor-pointer" onClick={toggle}>
                <X size={30} className="ml-auto " />
            </div>
            <form className='md:w-[500px] w-full px-2'>
                <h3 className='text-center text-2xl border-b font-bold'>Add New Course</h3>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Course Title</label>
                    <input type='text' id='title' name='title' placeholder='What is the course title?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Course code</label>
                    <input type='text' id='code' name='code' placeholder='What is the course code?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Course unit</label>
                    <input type='number' id='unit' name='unit' placeholder='What is the course unit?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Course Title</label>
                    <select className='border p-2 focus:border-blue-500 rounded-md outline-none' required>
                        <option>-- Select --</option>
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                    </select>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Lecturer</label>
                    <select className='border p-2 focus:border-blue-500 rounded-md outline-none' required>
                        <option>-- Select --</option>
                        <option>Mr Agbai Jackson</option>
                        <option>Mrs Emmanuella Daniella</option>
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

export default CourseForm
