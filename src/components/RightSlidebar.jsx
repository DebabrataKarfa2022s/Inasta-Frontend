// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import SuggestedUsers from './SuggestedUsers';

// const RightSlidebar = () => {
//   const { user } = useSelector(store => store.auth);
//   return (
//     <div className='w-fit my-10 pr-32'>
//       <div className='flex items-center gap-2'>
//         <Link to={`/${user?._id}/profile`}>
//           <Avatar>
//             <AvatarImage src={user?.profilePicture} alt="postImage" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </Link>

//         <div>
//           <h1 className='font-semibold text-sm '>
//             <Link to={`/${user?._id}/profile`} >{user?.username}</Link>
//           </h1>
//           <span className='text-gray-600 text-sm'>{user?.bio || 'bio here...'}</span>
//         </div>
//       </div>

//       <SuggestedUsers />

//     </div>
//   )
// }

// export default RightSlidebar



import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SuggestedUsers from './SuggestedUsers';

const RightSlidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className='w-fit my-10 pr-32 hidden lg:block'>
      <div className='flex items-center gap-2'>
        <Link to={`/${user?._id}/profile`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt='Profile Picture' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <h1 className='font-semibold text-sm'>
            <Link to={`/${user?._id}/profile`}>{user?.username}</Link>
          </h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>

      <SuggestedUsers />
    </div>
  );
};

export default RightSlidebar;
