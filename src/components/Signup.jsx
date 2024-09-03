import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { toast } from 'sonner';
import icon1 from "../assets/icon1.json"
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [loding, setLoding] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  console.log("message : ", input.username)

  const { user } = useSelector(store => store.auth);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  // console.log("url ", SummaryApi.signUp.url)
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);
      const response = await axios.post(`${SummaryApi.signUp.url}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });
      console.log(response)

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setInput({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error in signup in signuphandler function: ", error)
      toast.error(error.response.data.message);
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (input.username) {
        setCheckLoading(true)
        setMessage("")
      }
      try {

        const response = await axios.get(`${SummaryApi.checkUsernameUnique.url}/${input.username}`, {
          withCredentials: true,
        });

        // console.log(response)
        if (response.data.success) {
          setMessage(response.data.message)
        } else {
          setMessage(response.data.message)
        }

      } catch (error) {
        console.log("error from check username unique  : ", error)
      } finally {
        setCheckLoading(false)

      }
    }

    checkUsernameUnique()
  }, [input.username])



  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={signUpHandler} className='shadow-lg flex flex-col gap-4 p-8'>
        <div className='my-4 flex flex-col justify-center items-center'>
          {/* <h1 className='text-center font-bold text-xl'>LOGO</h1> */}
          <Lottie animationData={icon1} className='w-24 h-24' />
          <p className='text-sm text-center'>Sign up to see photos & videos from your friends</p>
        </div>
        <div>
          <span className='font-medium'>Username</span>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="focus-visible:ring-transparent my-2"
            required
            value={input.username}
            onChange={changeEventHandler}
          />
          {checkLoading && <Loader2 className="animate-spin" />}
          {!checkLoading && message && (
            <p className={`text-sm ${message === "username is unique" ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
          )}
        </div>
        <div>
          <span className='font-medium'>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="focus-visible:ring-transparent my-2"
            required
            value={input.email}
            onChange={changeEventHandler}

          />
        </div>
        <div>
          <span className='font-medium'>Password</span>
          <div className='border flex rounded'>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="focus-visible:ring-transparent my-2 border-none"
              required
              value={input.password}
              onChange={changeEventHandler}
            />
            <button
              type='button'
              className='cursor-pointer text-xl pr-3 '
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {
          loding ? (
            <Button className='bg-green-500 text-white  hover:bg-green-700'>
              <Loader2 className=' mr-2 w-4 h-4 animate-spin' /> please wait
            </Button>
          ) : (
            <Button type='submit' className='bg-green-500 text-white rounded-md p-2 hover:bg-green-700 font-bold text-lg'>Sign up</Button>
          )
        }
        <span className='text-center'>Already have an account?
          <Link to="/login" className='text-blue-600'> Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Signup



