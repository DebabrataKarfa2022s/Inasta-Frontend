// import { SummaryApi } from '@/common/index';
// import Lottie from 'lottie-react';
// import React, { useState } from 'react'
// import icon1 from "../assets/icon1.json"
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'sonner';

// const ResetPassword = () => {
//     const [showPassword, setShowPassword] = useState(false)
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassrod] = useState('');
//     const navigate = useNavigate();
//     const { id, token } = useParams();
//     const url = `${SummaryApi.resetPassword.url}/${id}/${token}`
//     console.log("url=",url);

//     console.log("password : ", password)
//     console.log("id : ", id)
//     console.log("token: ", token)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             if (password === confirmPassword) {
//                 console.log("called")
//                 const response = await axios.post(url,{password:password},{
//                     headers:{
//                         "Content-Type":"application/json"
//                     },
//                     withCredentials:true
//                 })

//                 console.log("response from reset password : ",response)
//                if(response.data.success){
//                 toast.success(response.data.data.message)
//                 navigate("/login")
//                }else {
//                 toast.error(response.data.data.message)
//                }   
//             }
//             else {
//                 toast.error("Please check password and confirm password")
//             }
//         } catch (error) {
//             console.log("error from reset password : ",error)
//             toast.error(error.response.data.message)
//         }
//     }

//     return (
//         <section >
//             <div className='mx-auto container p-4'>
//                 <div className='bg-white p-5 w-full max-w-sm mx-auto'>
//                     <div className='w-20 h-20 mx-auto'>
//                         <Lottie animationData={icon1} />
//                     </div>
//                     <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit} >
//                         <div>
//                             <div className='bg-slate-100 p-2 flex mb-4'>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder='New Password'
//                                     value={password}
//                                     name='password'
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent' />
//                                 <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
//                                     <span>
//                                         {
//                                             showPassword ? (
//                                                 <FaEyeSlash />
//                                             )
//                                                 :
//                                                 (
//                                                     <FaEye />
//                                                 )
//                                         }
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className='bg-slate-100 p-2 flex mb-4'>
//                                 <input
//                                     type="password"
//                                     placeholder='Confirm New Password'
//                                     value={confirmPassword}
//                                     name='ConfirmPassword'
//                                     onChange={(e) => setConfirmPassrod(e.target.value)}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent' />
//                             </div>
//                         </div>

//                         <button type='submit' className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Reset Password</button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     )
// }


// export default ResetPassword

import { SummaryApi } from '@/common/index';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import icon1 from "../assets/icon1.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();
    const url = `${SummaryApi.resetPassword.url}/${id}/${token}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                console.log("called");
                const response = await axios.post(url, { password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                console.log("response from reset password:", response);
                if (response.data.success) {
                    toast.success(response.data.data.message);
                    navigate("/login");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Please check password and confirm password");
            }
        } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
        toast.error(errorMessage);
        }
    };

    return (
        <section>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <Lottie animationData={icon1} />
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div>
                            <div className='bg-slate-100 p-2 flex mb-4'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='New Password'
                                    value={password}
                                    name='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <button
                                    type='button'
                                    className='cursor-pointer text-xl'
                                    onClick={() => setShowPassword(prev => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <div className='bg-slate-100 p-2 flex mb-4'>
                                <input
                                    type="password"
                                    placeholder='Confirm New Password'
                                    value={confirmPassword}
                                    name='confirmPassword'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
