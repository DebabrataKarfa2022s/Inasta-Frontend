import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/error.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={error} className="max-w-[90%] max-h-[90%]" />
      <div className='flex gap-5'>   
      <span className="mt-4 text-center">
        <Link to="/login" className="text-green-600 text-xl font-bold hover:underline hover:text-sky-500">
          Back to login
        </Link>
      </span>
      <span className="mt-4 text-center">
        <Link to="/" className="text-pink-600 text-xl font-bold hover:underline hover:text-amber-500">
          Back to home
        </Link>
      </span>
      </div>
    </div>
  );
};

export default ErrorPage;
