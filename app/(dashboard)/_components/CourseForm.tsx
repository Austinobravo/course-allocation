import { X } from 'lucide-react'
import React from 'react'
interface Props {
    toggle: () => void
}
const CourseForm = ({toggle}: Props) => {
  return (
    <section className='bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center ' >
        <div className='bg-white'>
            <div className="p-3 cursor-pointer" onClick={toggle}>
                <X size={30} className="ml-auto " />
            </div>
            <form>
                <div>
                    <label>Course Title</label>
                    <input type='text' id='title' name='title' placeholder='What is the course title?' required/>
                </div>
                <div>
                    <label>Course code</label>
                    <input type='text' id='code' name='code' placeholder='What is the course code?' required/>
                </div>
                <div>
                    <label>Course unit</label>
                    <input type='number' id='unit' name='unit' placeholder='What is the course unit?' required/>
                </div>
                <div>
                    <label>Course Title</label>
                    <select>
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                    </select>
                </div>
                <div>
                    <label>Lecturer</label>
                    <select>
                        <option>Mr Agbai Jackson</option>
                        <option>Mrs Emmanuella Daniella</option>
                    </select>
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>

        </div>
      
    </section>
  )
}

export default CourseForm
