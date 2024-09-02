import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUser from '@/hooks/useGetSuggestedUser';
import React from 'react'
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSlidebar from './RightSlidebar';

const Home = () => {

  useGetAllPost();
  useGetSuggestedUser();

  return (
    <div className='flex'>
      <div className='flex-grow'> 
        <Feed/>
        <Outlet/>
      </div>
      <RightSlidebar/>
    </div>
  )
}

export default Home
