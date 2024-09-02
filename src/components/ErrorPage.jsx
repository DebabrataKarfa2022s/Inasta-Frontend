import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/error.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={error} className="max-w-[90%] max-h-[90%]" />
      <span className="mt-4 text-center">
        <Link to="/login" className="text-green-600 text-xl font-bold hover:underline hover:text-pink-600">
          Back to login
        </Link>
      </span>
    </div>
  );
};

export default ErrorPage;
