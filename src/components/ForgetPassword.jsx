import Lottie from 'lottie-react';
import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import icon1 from "../assets/icon1.json"
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { toast } from 'sonner';



const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    console.log("email : ", email)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${SummaryApi.forgotPassword.url}`, {email}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log("response from forgot password : ",response)

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("error from forget passwrod : ", error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <section >
            <div className='mt-10 w-screen h-screen container p-4 '>
                <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-lg'>
                    <div className='w-20 h-20 mx-auto'>
                        <Lottie animationData={icon1} />
                    </div>

                    <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit} >
                        <div className='grid'>
                            <label className='text-sm font-bold'>*Please enter your email address</label>
                            <div className='bg-slate-100 p-2 mt-6'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full h-full outline-none bg-transparent ' />
                            </div>
                        </div>

                        <Link to={'/login'} className='block text-sm text-slate-500 w-fit ml-auto hover:underline hover:text-pink-600'>
                            Back to Login
                        </Link>

                        <button type='submit' className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Reset Password</button>
                    </form>
                </div>
            </div>
        </section>
    )
}


export default ForgetPassword