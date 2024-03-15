import { getCourses } from '@/lib/getDetails'
import axios from 'axios'
import { X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
interface Props {
    toggle: () => void
}
const LecturerForm = ({toggle}:Props) => {
    const [allCourses, setAllCourses] = React.useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

    const submitLecturerForm = async (event:React.FormEvent) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget as any)
        const title = data.get('title')
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const courseId = +data.get('course')!
        try {
            setIsSubmitting(true)
            await axios.post('/api/lecturer', {title, firstName,lastName,courseId})
            .then((response) => {
                toast.success(response.data.message || "Lecturer created.")
                window.location.reload()
            })
            
        } catch (error) {
            toast.error(error.data.message || "An error occured")
        }finally{
            setIsSubmitting(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const courseResponse = await getCourses()
            if(courseResponse){
                setAllCourses(courseResponse.data)
            }
        }
        fetchData()
    }, [])
  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center ' >
        <div className='bg-white w-full md:w-[500px]'>
            <div className="p-3 cursor-pointer" onClick={toggle}>
                <X size={30} className="ml-auto " />
            </div>
            <form className='md:w-[500px] w-full px-2' onSubmit={submitLecturerForm}>
                <h3 className='text-center text-2xl border-b font-bold'>Add New Lecturer</h3>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Title</label>
                    <select className='border p-2 focus:border-blue-500 rounded-md outline-none' name='title' required>
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
                {allCourses.length > 0 &&
                    <div className='flex flex-col pt-2 '>
                        <label className='font-bold'>Courses Of Specialization</label>
                        <select className='border p-2 focus:border-blue-500 rounded-md outline-none' name='course' required>
                            <option>-- Select --</option>
                            {allCourses.map((course, index) => (
                                <option key={index} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                }
                <div className='pt-2'>
                    <button type='submit' className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md text-white' disabled={isSubmitting}>{isSubmitting ? 'Creating lecturer...' : 'Create new lecturer'}</button>
                </div>
            </form>

        </div>
  
    </section>
  )
}

export default LecturerForm
