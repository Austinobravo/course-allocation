import { getCourses, getLecturers, getLevels } from '@/lib/getDetails'
import axios from 'axios'
import { X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
interface Props {
    toggle: () => void
}
const CourseForm = ({toggle}: Props) => {
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
    const [allLevel, setAllLevel] = React.useState<any[]>([])

    const submitCourseForm = async (event:React.FormEvent) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget as any)
        const title = data.get('title')
        const code = data.get('code')
        const unit = +data.get('unit')!
        const levelId = +data.get('level')!

        try{
            setIsSubmitting(true)
            await axios.post('/api/course', {title, code, unit, levelId})
            .then((response) => {
                toast.success(response.data.message || "Course created.")
                window.location.reload()
            })

        }catch(error:any){
            console.error("error",error)
            toast.error(error.response.data.message || "An error occured")

        }finally{
            setIsSubmitting(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const levelResponse = await getLevels()
            if (levelResponse) {
                setAllLevel(levelResponse.data)
            }
        }
        fetchData()
    }, [])

  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center ' >
        <div className='bg-white w-full md:w-[500px]'>
            <div className="p-3 cursor-pointer" onClick={toggle} title='Close'>
                <X size={30} className="ml-auto " />
            </div>
            <form className='md:w-[500px] w-full px-2' onSubmit={submitCourseForm}>
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
                {allLevel.length > 0 &&
                    <div className='flex flex-col pt-2 '>
                        <label className='font-bold'>Level</label>
                        <select className='border p-2 focus:border-blue-500 rounded-md outline-none' name='level' required>
                            <option>-- Select --</option>
                            {allLevel.map((level, index) => (
                                <option key={index} value={level.id}>{level.level}</option>
                            ))}
                        </select>
                    </div>
                }
                <div className='pt-2'>
                    <button type='submit' className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md text-white' disabled={isSubmitting}>{isSubmitting ? 'Creating course...' : 'Create new course'}</button>
                </div>
            </form>

        </div>
      
    </section>
  )
}

export default CourseForm
