'use client'
import { LogOut, Plus } from 'lucide-react'
import React, { useState } from 'react'
import CourseForm from './CourseForm'

const levels = [
    '100 Level Courses',
    '200 Level Courses',
    '300 Level Courses',
    '400 Level Courses',
    '500 Level Courses'
]
interface Props{
    toggle? : boolean
}
const Sidebar = ({toggle}: Props) => {
    const [isCourseFormToggled, setIsCourseFormToggled] = useState<boolean>(false)
  return (
    <>
    {!toggle &&
        <section className='fixed px-10 pt-10 w-[350px] md:block hidden '>
            <div className='divide-y space-y-3 border bg-gray-100 px-3 py-2'>
                <div>
                    <h2>Dashboard</h2>
                </div>
                <div className='space-y-2'>
                    <h3 className='font-bold'>MANAGE COURSES</h3>
                    <div className='flex gap-x-1 items-center'>
                        <Plus size={15}/>
                        <span className='hover:underline cursor-pointer' onClick={()=> setIsCourseFormToggled(!isCourseFormToggled)}>Add new Course</span>
                    </div>
                </div>
                {levels.map((level, index) => (
                    <div key={index}>
                        {level}
                    </div>
                ))}
                <div className='space-y-2'>
                    <h3 className='font-bold'>Lectures</h3>
                    <div  className='flex gap-x-1 items-center'>
                        <Plus size={15}/>
                        <span className='hover:underline cursor-pointer'>Add new Lecturer</span>
                    </div>
                </div>
                <div className='py-5 flex items-center gap-x-1'>
                    <LogOut size={15}/>
                    <button className='hover:underline'>
                        Logout

                    </button>

                </div>

            </div>
        </section>
    }
    {isCourseFormToggled && 
        <CourseForm toggle={()=>setIsCourseFormToggled(!isCourseFormToggled)}/>
    }
    </>
  )
}

export default Sidebar
