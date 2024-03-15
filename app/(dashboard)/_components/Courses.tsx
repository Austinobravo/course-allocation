'use client'
import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'

const Courses = () => {
    const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(true)

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
                <div className='bg-blue-500 rounded-lg text-white py-2 px-4 w-fit'>
                    <button>Allocate Courses</button>
                </div>
                <div className='cursor-pointer hidden md:block' onClick={()=>{setIsSidebarToggled(!isSidebarToggled)}}>
                    <Menu/>
                </div>

            </div>
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
                        <tr>
                            <td>Communications and Networking</td>
                            <td>CSC201</td>
                            <td>3</td>
                            <td>200</td>
                            <td>Mr Agbai Jackson</td>
                        </tr>
                        <tr>
                            <td>Communications and Networking</td>
                            <td>CSC201</td>
                            <td>3</td>
                            <td>200</td>
                            <td>Mr Agbai Jackson</td>
                        </tr>
                        <tr>
                            <td>Communications and Networking</td>
                            <td>CSC201</td>
                            <td>3</td>
                            <td>200</td>
                            <td>Mr Agbai Jackson</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
      
    </section>
  )
}

export default Courses
