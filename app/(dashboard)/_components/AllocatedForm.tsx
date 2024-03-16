import { getCourses, getLecturers, getLevels } from '@/lib/getDetails'
import axios from 'axios'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'


interface Props{
    toggle: () => void
}
const AllocatedForm = ({toggle}:Props) => {
    const [allLevels, setAllLevels] = React.useState<any[]>([])
    const [currentStep, setCurrentStep] = React.useState<number>(1)
    const [courseId, setCourseId] = React.useState<number>(0)
    const [levelId, setLevelId] = React.useState<number>(0)
    const [lecturerId, setLecturerId] = React.useState<number>(0)
    const [allCourses, setAllCourses] = React.useState<any[]>([])
    const [allLecturers, setAllLecturers] = React.useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

    const formSteps = 3

    const submitForm = async (event:React.FormEvent) => {
        event.preventDefault()
        if(currentStep === 3){
            try{
                setIsSubmitting(true)
                await axios.patch('/api/course', {courseId, lecturerId})
                .then((response) => {
                    toast.success(`${response.data.message}`)
                    window.location.reload()
            })
                
            }catch(error:any){
                toast.error(error.response.data.message || "An error occured.")

            }finally{
                setIsSubmitting(false)
            }
        } else{
            setCurrentStep(currentStep + 1)
        }
       
    }

    const getLevelCourses = (id:number) => {
        const gottenLevelCourses = allLevels.filter((eachLevel)=> eachLevel.id === id)
        setAllCourses(gottenLevelCourses[0]?.course)
    }

    React.useEffect(()=>{
        const fetchData = async () => {
            const levelResponse = await getLevels()
            if (levelResponse) {
                setAllLevels(levelResponse.data)
            }

            const lecturerResponse = await getLecturers()
            if(lecturerResponse){
                setAllLecturers(lecturerResponse.data)
            }
        }
        fetchData()
    },[])
  return (
    <section className='bg-black/50 top-0 left-0 w-full h-full fixed z-20 flex justify-center'>
      <div className='bg-white w-full md:w-[500px]'>
            <div className="p-3 cursor-pointer" onClick={toggle}>
                <X size={30} className="ml-auto " />
            </div>
            <h3 className='text-center text-2xl border-b font-bold'>Allocate Course </h3>
            {currentStep === 1 && 
                <form className='md:w-[500px] w-full px-2' onSubmit={(e)=>{submitForm(e),getLevelCourses(levelId)}} >
                    <div className='flex flex-col pt-2 '>
                        <label className='font-bold'>Which level are you allocating to?</label>
                        {allLevels.length > 0 && allLevels.map((level, index) => (
                            <div key={index} className='space-x-1'>
                                <span className='pr-2'>{index + 1}.</span> 
                                <input type='radio' id='level' name='level' value={level.id} onChange={()=>setLevelId(level.id)} placeholder='Which level?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/> 
                                <label htmlFor='level'>{level.level}</label>
                            </div>
                        ))}
                    </div>
                    <div className='pt-2 flex items-center justify-between'>
                        <button type='submit' className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md text-white'>Choose</button>
                        <div className='font-bold'>
                            <span className='text-2xl'>{currentStep}</span>/
                            <span >{formSteps}</span>
                        </div>
                    </div>
                </form>
            }
            {currentStep === 2 && 
                <form className='md:w-[500px] w-full px-2' onSubmit={submitForm}>
                    {allCourses.length > 0 ?
                    <>
                    <div className='flex flex-col pt-2 '>
                        <label className='font-bold'>Which course are you allocating?</label>
                         {allCourses.map((course, index) => (
                            <div key={index} className='space-x-1'>
                                <span className='pr-2'>{index + 1}.</span> 
                                <input type='radio' id='course' name='course' value={course.id} onChange={()=> setCourseId(course.id)} placeholder='Which course?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/> 
                                <label htmlFor='course'>{course.title} <span className='text-xs'>{course.code}</span></label>
                            </div>
                        ))}
                    </div>
                    <div className='pt-2 flex items-center justify-between'>
                        <button type='submit' className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md text-white' >Choose</button>
                        <div className='font-bold'>
                            <span className='text-2xl'>{currentStep}</span>/
                            <span >{formSteps}</span>
                        </div>
                    </div>
                    </>
                        :
                    <p className='text-red-500 font-bold text-center text-xs'>No course gotten for this level. Please go back to the dashboard and register a course for this level <Link href={`/`} className='text-blue-500'>now</Link></p>
                    }
                </form>
            }
            {currentStep === 3 && 
                <form className='md:w-[500px] w-full px-2'  onSubmit={submitForm}>
                    <div className='flex flex-col pt-2 '>
                        <label className='font-bold'>Which Lecturer are you allocating to?</label>
                        {allLecturers.length > 0 && allLecturers.map((lecturer, index) => (
                            <div key={index} className='space-x-1'>
                                <span className='pr-2'>{index + 1}.</span> 
                                <input type='radio' id='lecturer' name='lecturer' value={lecturer.id} onChange={()=>setLecturerId(lecturer.id)} placeholder='Which lecturer?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/> 
                                <label htmlFor='lecturer'>{lecturer.title} {lecturer.firstName} {lecturer.lastName}</label>
                            </div>
                        ))}
                    </div>
                    <div className='pt-2 flex items-center justify-between'>
                        <button type='submit' className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md text-white' >{isSubmitting ? 'Allocating course..' : 'Allocate course'}</button>
                        <div className='font-bold'>
                            <span className='text-2xl'>{currentStep}</span>/
                            <span >{formSteps}</span>
                        </div>
                    </div>
                </form>
            }
        </div>
    </section>
  )
}

export default AllocatedForm
