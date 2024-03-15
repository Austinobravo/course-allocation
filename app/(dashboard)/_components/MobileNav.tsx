'use client'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'

const MobileNav = () => {
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
    React.useEffect(()=> {
        const handleResize = () => {
            if(window.innerWidth >= 756){
                setIsMenuToggled(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return ()=> {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
  return (
    <nav>
        <div className='w-full cursor-pointer' onClick={()=> setIsMenuToggled(!isMenuToggled)}>
            <Menu size={30}/>
        </div>
        {isMenuToggled &&
            <div className='bg-black/50 z-50 flex top-0 left-0 fixed w-full h-full'>
                <div className=' h-full text-black border bg-inherit border-gray-500 relative w-[650px]'>
                    <Sidebar/>
                </div>
                <div className='cursor-pointer flex justify-end p-4 w-fit h-fit' onClick={()=> {setIsMenuToggled(!isMenuToggled)}}>
                    <X size={40}/>
                </div>
            </div>
        }
      
    </nav>
  )
}

export default MobileNav
