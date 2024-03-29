'use client'
import { Loader2, LogOut, Plus } from 'lucide-react'
import React, { useState } from 'react'
import CourseForm from './CourseForm'
import LecturerForm from './LecturerForm'
import LogoutModal from './LogoutModal'
import axios from 'axios'
import { getLevels } from '@/lib/getDetails'

const levels = [
    '100 Level Courses',
    '200 Level Courses',
    '300 Level Courses',
    '400 Level Courses',
    '500 Level Courses'
]

const Sidebar = () => {
    const [isCourseFormToggled, setIsCourseFormToggled] = useState<boolean>(false)
    const [isLecturerFormToggled, setIsLecturerFormToggled] = useState<boolean>(false)
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState<boolean>(false)
    const [allLevel, setAllLevel] = useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await getLevels()
            if (response) {
                setAllLevel(response.data)
            }
            setIsLoading(false)

        }
        fetchData()
        
    },[])

    React.useEffect(()=> {
        const handleResize = () => {
            if(window.innerWidth >= 756){
                setIsCourseFormToggled(false)
                setIsLecturerFormToggled(false)
                setIsLogOutModalOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return ()=> {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
  return (
    <>
        <section className='fixed px-10 pt-10 w-[350px] '>
        {isLoading ?
                <div className='flex justify-center items-center'>
                    <Loader2 size={80} className='animate-spin'/>
                </div>
            :
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
                {allLevel.map((level, index) => (
                    <div key={index}>
                        <p>{level.level} Level Courses</p>
                    </div>
                ))}
                <div className='space-y-2'>
                    <h3 className='font-bold'>Lectures</h3>
                    <div  className='flex gap-x-1 items-center'>
                        <Plus size={15}/>
                        <span className='hover:underline cursor-pointer' onClick={()=>setIsLecturerFormToggled(!isLecturerFormToggled)}>Add new Lecturer</span>
                    </div>
                </div>
                <div className='py-5 flex items-center gap-x-1'>
                    <LogOut size={15}/>
                    <button className='hover:underline' onClick={()=>setIsLogOutModalOpen(!isLogOutModalOpen)}>
                        Logout
                    </button>

                </div>

            </div>
        }
        </section>
    {isCourseFormToggled && 
        <CourseForm toggle={()=>setIsCourseFormToggled(!isCourseFormToggled)}/>
    }
    {isLecturerFormToggled && 
        <LecturerForm toggle={()=>setIsLecturerFormToggled(!isLecturerFormToggled)}/>
    }
    {isLogOutModalOpen && 
        <LogoutModal toggle={()=>setIsLogOutModalOpen(!isLogOutModalOpen)}/>
    }
    </>
  )
}

export default Sidebar
