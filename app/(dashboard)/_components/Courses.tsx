'use client'
import { Loader2, Menu, Printer } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { getCourses, getLevels } from '@/lib/getDetails'
import AllocatedForm from './AllocatedForm'
import { useSession } from 'next-auth/react'
const Courses = () => {
    const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(true)
    const [isAllocatedFormToggled, setIsAllocatedFormToggled] = useState<boolean>(false)
    const [allCourses, setAllCourses] = React.useState<any[]>([])
    const [allLevels, setAllLevels] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const getApproriateLevel:any = (id:number)=> {
        const gottenLevel = allLevels.filter((eachLevel) => eachLevel.id === id)
        return gottenLevel[0]?.level
    }
    
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const courseResponse = await getCourses()
            if(courseResponse){
                setAllCourses(courseResponse.data)
            }
            const levelResponse = await getLevels()
            if(levelResponse){
                setAllLevels(levelResponse.data)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [])

    React.useEffect(()=> {
        const handleResize = () => {
            if(window.innerWidth >= 756){
                setIsSidebarToggled(true)
            }

        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])
  return (
    <section>
        {isSidebarToggled &&
        <div className='md:block hidden'>
            <Sidebar/>
        </div>
        }
        <div className={`${isSidebarToggled ? 'md:pl-80' : ' w-full'}   pt-5 md:px-10 px-2 space-y-2 `}>
            <div className='flex justify-between items-center'>
                <div className={`${allCourses.length <= 0 && '!bg-blue-300 cursor-not-allowed'} bg-blue-500 rounded-lg text-white py-2 px-4 w-fit`}>
                    <button className={``} disabled={allCourses.length <= 0} onClick={()=>setIsAllocatedFormToggled(!isAllocatedFormToggled)}>Allocate Courses</button>
                </div>
                <div className='cursor-pointer hidden md:block' onClick={()=>{setIsSidebarToggled(!isSidebarToggled)}}>
                    <Menu/>
                </div>

            </div>

            {isLoading ?
                <div className='flex justify-center items-center'>
                    <Loader2 size={80} className='animate-spin'/>
                </div>
            :
            <>
                {allCourses.length > 0 ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Course Code</th>
                                    <th>Unit</th>
                                    <th>Level</th>
                                    <th>Lecturer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCourses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.title}</td>
                                        <td>{course.code}</td>
                                        <td>{course.unit}</td>
                                        <td>{getApproriateLevel(course.levelId)}</td>
                                        <td>{course.lecturer.map((lecturer:any, index:any) => (
                                            <span key={index} className='flex flex-col'>
                                                <span>{lecturer.title} {lecturer.firstName} {lecturer.lastName}</span>
                                            </span>
                                            
                                        ))}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <div className=' ml-auto bg-red-500 rounded-lg text-white py-1 my-2 px-4 w-fit'>
                            <button className='flex items-center' onClick={()=>window.print()}><Printer size={13} className='mr-1'/> <span>Print</span></button>
                        </div>
                    </div>
                :
                    <div>
                        <p>No Courses created yet.</p>
                    </div>
                }
            </>
            }

        </div>

        {isAllocatedFormToggled && 
            <div>
                <AllocatedForm toggle={()=>setIsAllocatedFormToggled(!isAllocatedFormToggled)}/>
            </div>
        }
      
    </section>
  )
}

export default Courses
