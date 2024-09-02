// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Link } from 'react-router-dom'

// const Comment = ({ comment }) => {
//   return (
//     <div className='my-2'>
//       <div className='flex gap-3 items-center'>
//         <Link to={`${comment?.author?._id}/profile`}>
//         <Avatar>
//           <AvatarImage src={comment?.author?.profilePicture} />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//         </Link>
//         <h1 className='font-bold text-sm'><Link to={`${comment?.author?._id}/profile`}>{comment?.author.username}</Link> <span className='font-normal pl-1'>{comment?.text}</span></h1>
//       </div>
//     </div>
//   )
// }

// export default Comment


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => {
  return (
    <div className="my-2 px-2 md:px-0">
      <div className="flex gap-3 items-center">
        <Link to={`/${comment?.author?._id}/profile`}>
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={comment?.author?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <h1 className="flex-1 text-sm md:text-base">
          <Link to={`/${comment?.author?._id}/profile`} className="font-bold">
            {comment?.author.username}
          </Link>
          <span className="font-normal pl-1">{comment?.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;
