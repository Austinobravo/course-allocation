'use client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const LoginForm = () => {
    const [isPasswordToggled, setIsPasswordToggled] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const router = useRouter()
    const submitLoginForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const data = new FormData(event?.currentTarget as any)
        const username = data.get('username')
        const password = data.get('password')

        try{
            setIsSubmitting(true)
            const response = await signIn(
                'credentials',
                {
                redirect:false,
                username: username,
                password: password,
                callbackUrl: callbackUrl
                },  
            )
            if(response?.error) return toast.error(response.error)
            if(response?.url){
                toast.success("Login Successfull")
                router.push('/')
            } 
        }catch(error){
            console.error(error)
        }finally{
            setIsSubmitting(false)
        }
    }
  return (
   
        <form className='md:w-[500px] sm:w-[600px]  w-full px-5  py-4 pb-5 mt-2 rounded-lg ' onSubmit={submitLoginForm} >
                <h3 className='text-center text-2xl font-bold'>Login In</h3>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Username</label>
                    <input type='text' id='username' name='username' placeholder='Your username' className='border p-2 focus:border-blue-500 rounded-md outline-none' required/>
                </div>
                <div className='flex flex-col pt-2 '>
                    <label className='font-bold'>Password</label>
                    <div className='flex relative '>
                        <input type={isPasswordToggled ? 'text' : 'password'} id='password' name='password' placeholder='Your password' className='p-2 focus:border-blue-500 rounded-md outline-none border w-full' required/>
                        <div className='right-3 absolute top-3 cursor-pointer' onClick={()=> setIsPasswordToggled(!isPasswordToggled)}>
                            {isPasswordToggled ?
                                <EyeOff/>
                            :
                                <Eye/>
                            }
                        </div>

                    </div>
                </div>
                <div className='pt-2'>
                    <button type='submit' className='bg-blue-500 mx-auto flex justify-center items-center disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-2 rounded-md w-full font-bold text-white' disabled={isSubmitting}>{isSubmitting ? <Loader2 className='animate-spin' size={20}/> : 'Login'}</button>
                </div>
        </form>
      
   
  )
}

export default LoginForm
