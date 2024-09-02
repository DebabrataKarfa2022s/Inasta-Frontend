// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { SummaryApi } from '@/common/index';
// import { setAuthUser } from '@/redux/authSlice';
// import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

// const SuggestedUsers = () => {
//   const { suggestedUsers,user} = useSelector((store) => store.auth);
//   const [open, setOpen] = useState(false);
//   // State object to track the following status for each suggested user
//   const [followingStatus, setFollowingStatus] = useState({});
//   const dispatch = useDispatch();
//   // console.log("userProfile from suggested page  : ", userProfile)
  

//   // const followORUnfollow = async (userId) => {
//   //   try {
//   //     const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, { withCredentials: true });
      
//   //     if (response.data.success) {
//   //       toast.success(response.data.data);

//   //       // Toggle the following status for the user
//   //       setFollowingStatus(prevState => ({
//   //         ...prevState,
//   //         [userId]: !prevState[userId] // Toggle between true and false
//   //       }));
//   //     } else {
//   //       toast.error(response.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log('Error in follow or unfollow function:', error);
//   //   }
//   // };

//   const followORUnfollow = async (userId) => {
//     try {
//       const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, { withCredentials: true });
      
//       if (response.data.success) {
//         toast.success(response.data.data);

//         // Toggle the following status for the user
//         setFollowingStatus(prevState => ({
//           ...prevState,
//           [userId]: !prevState[userId] // Toggle between true and false
//         }));

//         // Update the userProfile following status in Redux store
//         let updatedFollowing;
//         if (user.following.includes(userId)) {
//           updatedFollowing = user.following.filter(id => id !== userId);
//         } else {
//           updatedFollowing = [...user.following, userId];
//         }

//         // Dispatch the updated userProfile to Redux
//         dispatch(setAuthUser({
//           ...user,
//           following: updatedFollowing
//         }));
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log('Error in follow or unfollow function in suggested user :', error);
//     }
//   };


//   return (
//     <div>  
//     <div className='my-10'>
//       <div className='flex items-center justify-between text-sm'>
//         <h1 className='font-semibold text-gray-600 mr-2'>Suggested for you</h1>
//         <span onClick={()=>setOpen(true)} className='font-medium cursor-pointer hover:text-gray-700 '>See All</span>
//       </div>

//       {
//         suggestedUsers?.slice(0,5).map(suggestedUser => {
//           const isFollowing = followingStatus[suggestedUser?._id];

//           return (
//             <div key={suggestedUser?._id} className='flex items-center justify-between my-5'>
//               <div className='flex items-center gap-2'>
//                 <Link to={`/${suggestedUser?._id}/profile`}>
//                   <Avatar>
//                     <AvatarImage src={suggestedUser?.profilePicture} alt="user_image" />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </Link>

//                 <div>
//                   <h1 className='font-semibold text-sm'>
//                     <Link to={`/${suggestedUser?._id}/profile`}>
//                       {suggestedUser?.username}
//                     </Link>
//                   </h1>
//                   <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
//                 </div>
//               </div>

//               <span
//                 onClick={() => followORUnfollow(suggestedUser?._id)}
//                 className={`text-xs font-bold cursor-pointer ${isFollowing ? 'text-gray-900 hover:text-[#8d8080]' : 'text-[#3495d6] hover:text-[#204761] '}`}
//               >
//                 {isFollowing ? 'Following' : 'Follow'}
//               </span>
//             </div>
//           );
//         })
//       }
//     </div>
//     <Dialog open={open}>
//       <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-80 max-h-96 overflow-y-scroll">
//         <DialogTitle>Suggested : </DialogTitle>
//         {
//         suggestedUsers?.slice(0,30).map(suggestedUser => {
//           const isFollowing = followingStatus[suggestedUser?._id];

//           return (
//             <div key={suggestedUser?._id} className='flex items-center justify-between '>
//               <div className='flex items-center gap-2'>
//                 <Link to={`/${suggestedUser?._id}/profile`}>
//                   <Avatar>
//                     <AvatarImage src={suggestedUser?.profilePicture} alt="user_image" />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </Link>

//                 <div>
//                   <h1 className='font-semibold text-sm'>
//                     <Link to={`/${suggestedUser?._id}/profile`}>
//                       {suggestedUser?.username}
//                     </Link>
//                   </h1>
//                   <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
//                 </div>
//               </div>

//               <span
//                 onClick={() => followORUnfollow(suggestedUser?._id)}
//                 className={`text-xs font-bold cursor-pointer ${isFollowing ? 'text-gray-900 hover:text-[#8d8080]' : 'text-[#3495d6] hover:text-[#204761] '}`}
//               >
//                 {isFollowing ? 'Following' : 'Follow'}
//               </span>
//             </div>
//           );
//         })
//       }
//       </DialogContent>
//     </Dialog>
//     </div>
//   );
// };

// export default SuggestedUsers;




import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { SummaryApi } from '@/common/index';
import { setAuthUser } from '@/redux/authSlice';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

const SuggestedUsers = () => {
    const { suggestedUsers, user } = useSelector((store) => store.auth);
    const [open, setOpen] = useState(false);
    const [followingStatus, setFollowingStatus] = useState({});
    const dispatch = useDispatch();

    const followOrUnfollow = async (userId) => {
        try {
            const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (response.data.success) {
                toast.success(response.data.data);
                setFollowingStatus(prevState => ({
                    ...prevState,
                    [userId]: !prevState[userId]
                }));

                // Update following status in Redux store
                const updatedFollowing = user.following.includes(userId)
                    ? user.following.filter(id => id !== userId)
                    : [...user.following, userId];

                dispatch(setAuthUser({
                    ...user,
                    following: updatedFollowing
                }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error in follow or unfollow function:', error);
            toast.error('An error occurred while updating follow status');
        }
    };

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span
                    onClick={() => setOpen(true)}
                    className='font-medium cursor-pointer hover:text-gray-700'
                >
                    See All
                </span>
            </div>

            {suggestedUsers?.slice(0, 5).map(suggestedUser => {
                const isFollowing = followingStatus[suggestedUser?._id];

                return (
                    <div key={suggestedUser?._id} className='flex items-center justify-between my-5'>
                        <div className='flex items-center gap-2'>
                            <Link to={`/${suggestedUser?._id}/profile`}>
                                <Avatar>
                                    <AvatarImage src={suggestedUser?.profilePicture} alt="user_image" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>

                            <div>
                                <h1 className='font-semibold text-sm'>
                                    <Link to={`/${suggestedUser?._id}/profile`}>
                                        {suggestedUser?.username}
                                    </Link>
                                </h1>
                                <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                            </div>
                        </div>

                        <span
                            onClick={() => followOrUnfollow(suggestedUser?._id)}
                            className={`text-xs font-bold cursor-pointer ${isFollowing ? 'text-gray-900 hover:text-[#8d8080]' : 'text-[#3495d6] hover:text-[#204761]'}`}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </span>
                    </div>
                );
            })}

            <Dialog open={open}>
                <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-80 max-h-96 overflow-y-scroll">
                    <DialogTitle>Suggested Users</DialogTitle>
                    {suggestedUsers?.slice(0, 30).map(suggestedUser => {
                        const isFollowing = followingStatus[suggestedUser?._id];

                        return (
                            <div key={suggestedUser?._id} className='flex items-center justify-between my-2'>
                                <div className='flex items-center gap-2'>
                                    <Link to={`/${suggestedUser?._id}/profile`}>
                                        <Avatar>
                                            <AvatarImage src={suggestedUser?.profilePicture} alt="user_image" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Link>

                                    <div>
                                        <h1 className='font-semibold text-sm'>
                                            <Link to={`/${suggestedUser?._id}/profile`}>
                                                {suggestedUser?.username}
                                            </Link>
                                        </h1>
                                        <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                                    </div>
                                </div>

                                <span
                                    onClick={() => followOrUnfollow(suggestedUser?._id)}
                                    className={`text-xs font-bold cursor-pointer ${isFollowing ? 'text-gray-900 hover:text-[#8d8080]' : 'text-[#3495d6] hover:text-[#204761]'}`}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </span>
                            </div>
                        );
                    })}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SuggestedUsers;
