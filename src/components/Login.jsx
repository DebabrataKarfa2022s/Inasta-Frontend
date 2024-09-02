import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { setAllUsers, setAuthUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import icon1 from "../assets/icon1.json"
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [loadig, setLoadig] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const signInHandler = async (e) => {
    e.preventDefault();

    try {
      setLoadig(true)
      const response = await axios.post(`${SummaryApi.login.url}`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      // console.log("lgoin response : ",response);
      if (response.data.success) {
        dispatch(setAuthUser(response.data.data))
        navigate("/");
        toast.success(response.data.message)
        setInput({
          email: "",
          password: ""
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log("error in login function : ", error);
      toast.error(error.response.data.message);
    }
    finally {
      setLoadig(false)
    }
  }


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${SummaryApi.getAllUsers.url}`, {
          withCredentials: true
        })

        console.log("response from fetch all user from login page : ", response);

        if (response.data.success) {
          dispatch(setAllUsers(response.data.data))
        }
      } catch (error) {
        console.log("error to fetch all user from login page : ", error);
      }
    }
    fetchAllUsers()
  }, [user])



  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={signInHandler} className='shadow-lg flex flex-col gap-4 p-8'>
        <div className='my-4 flex justify-center items-center flex-col'>
          <Lottie animationData={icon1} className='w-32 h-32 ' />
          <p className='text-sm text-center text-wrap'>Login to see Photos & videos from your friends</p>
        </div>
        <div>
          <span className='font-medium'>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="focus-visible:ring-transparent my-2"
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <span className='font-medium'>Password</span>
          <div className='flex border rounded'>   
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="focus-visible:ring-transparent my-2 border-none "
            value={input.password}
            onChange={changeEventHandler}
          />
          <button
            type='button'
            className='cursor-pointer text-xl pr-3'
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          </div>
        </div>

        <Link to={'/forgot-password'} className='block w-fit  ml-auto hover:underline hover:text-pink-600'>
          Forgot password ?
        </Link>
        {
          loadig ? (
            <Button className="bg-green-500 hover:bg-green-700">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              please wait
            </Button >
          ) : (<Button className="bg-green-500 hover:bg-green-700 font-bold text-md md:text-lg" type="submit">Login</Button>)
        }
        <span className='text-center'>
          Does't have an account? <Link to='/signup' className='text-blue-600'>Signup</Link>
        </span>
      </form>
    </div>
  )
}

export default Login


// import React, { useEffect, useState } from 'react';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Loader2 } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { SummaryApi } from '@/common';
// import { setAllUsers, setAuthUser } from '@/redux/authSlice';
// import { toast } from 'sonner';

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState({
//     email: "",
//     password: ""
//   });

//   const { user } = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     });
//   };

//   const signInHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const response = await axios.post(`${SummaryApi.login.url}`, input, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       });

//       if (response.data.success) {
//         dispatch(setAuthUser(response.data.data));
//         navigate("/");
//         toast.success(response.data.message);
//         setInput({
//           email: "",
//           password: ""
//         });
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error in login function:", error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const response = await axios.get(`${SummaryApi.getAllUsers.url}`, {
//           withCredentials: true
//         });

//         if (response.data.success) {
//           dispatch(setAllUsers(response.data.data));
//         }
//       } catch (error) {
//         console.error("Error fetching all users from login page:", error);
//       }
//     };
//     fetchAllUsers();
//   }, [user]);

//   return (
//     <div className='flex items-center justify-center w-screen h-screen bg-gray-100'>
//       <form onSubmit={signInHandler} className='flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg max-w-md w-full'>
//         <div className='my-4'>
//           <h1 className='text-center font-bold text-xl'>LOGO</h1>
//           <p className='text-sm text-center text-gray-600'>Login to see photos and videos from your friends.</p>
//         </div>
//         <div>
//           <label className='block font-medium text-gray-700 mb-1'>Email</label>
//           <Input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             className="focus-visible:ring-2 focus-visible:ring-blue-500 my-2 w-full"
//             value={input.email}
//             onChange={changeEventHandler}
//           />
//         </div>
//         <div>
//           <label className='block font-medium text-gray-700 mb-1'>Password</label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             className="focus-visible:ring-2 focus-visible:ring-blue-500 my-2 w-full"
//             value={input.password}
//             onChange={changeEventHandler}
//           />
//         </div>
//         {loading ? (
//           <Button className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center" disabled>
//             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//             Please wait
//           </Button>
//         ) : (
//           <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg" type="submit">
//             Login
//           </Button>
//         )}
//         <span className='text-center text-sm text-gray-600'>
//           Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Login;
