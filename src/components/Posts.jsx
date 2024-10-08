import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post';

const Posts = () => {
    const {posts} = useSelector(store=>store.post);
  return (
    <div className='mt-10 md:mt-0' >
      {
        posts.map((post)=><Post key={post._id} post={post} />)
      }
    </div>
  )
}

export default Posts
