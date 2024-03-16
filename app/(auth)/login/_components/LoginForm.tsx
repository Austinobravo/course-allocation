'use client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import React from 'react'

const LoginForm = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
  return (
    <div>
        <form className='md:w-[500px] w-full px-2  py-4 pb-5 mt-2 rounded-lg ' >
                <h3 className='text-center text-2xl font-bold'>Login In</h3>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Username</label>
                    <input type='text' id='username' name='username' placeholder='Your username?' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Password</label>
                    <div className='flex relative '>
                        <input type={isPasswordToggled ? 'text' : 'password'} id='password' name='password' placeholder='Your password?' className='p-2 focus:border-blue-500 rounded-md outline-none border w-full' required/>
                        <div className='right-3 absolute top-3' onClick={()=> setIsPasswordToggled(!isPasswordToggled)}>
                            {isPasswordToggled ?
                                <EyeOff/>
                            :
                                <Eye/>
                            }
                        </div>

                    </div>
                </div>
                <div className='pt-2'>
                    <button type='submit' className='bg-blue-500 mx-auto disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md w-full font-bold text-white' disabled={isSubmitting}>{isSubmitting ? <Loader2 className='animate-spin' size={15}/> : 'Login'}</button>
                </div>
            </form>
      
    </div>
  )
}

export default LoginForm
