import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { Dot } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const FollowAndFollowers = ({ open, setOpen, userId, activeTab , setActiveTab}) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  // const [activeTab, setActiveTab] = useState('followers');

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`${SummaryApi.getFollowers.url}/${userId}/followers`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setFollowers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`${SummaryApi.getFollowings.url}/${userId}/followings`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setFollowing(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchFollowers();
      fetchFollowing();
    }
  }, [open]);

  const renderUserList = (users) => {
    return users.map((user) => (
      <div key={user._id} className="flex items-center gap-2 p-2">
        <Link to={`/${user?._id}/profile`} onClick={()=>{setOpen(false)}}> 
        <Avatar>
          <AvatarImage src={user.profilePicture} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        </Link>
        {activeTab === 'followers' ? (
          <div className="flex items-center">
            <Link to={`/${user?._id}/profile`} onClick={()=>{setOpen(false)}}><span>{user.username}</span></Link>
            <Dot />
            <span className='text-[#3495d6] hover:text-[#204761] font-bold text-xs cursor-pointer'>Follow</span>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span>{user.username}</span>
            <Button variant="secondary" className="hover:bg-gray-200" >Following</Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="w-full max-w-md p-4 m-1">
        <DialogTitle className="flex justify-center items-center">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </DialogTitle>
        <div className="flex justify-around border-b mb-4">
          <button
            className={`w-1/2 text-center py-2 ${activeTab === 'followers' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers
          </button>
          <button
            className={`w-1/2 text-center py-2 ${activeTab === 'following' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>
        <div className="overflow-y-auto max-h-[300px] w-full">
          {activeTab === 'followers' ? (
            <div className="w-full">{renderUserList(followers)}</div>
          ) : (
            <div className="w-full">{renderUserList(following)}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowAndFollowers;




// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import axios from 'axios';
// import { SummaryApi } from '@/common/index';
// import { Dot } from 'lucide-react';
// import { Button } from './ui/button';
// import { Link } from 'react-router-dom';

// const FollowAndFollowers = ({ open, setOpen, userId, activeTab, setActiveTab }) => {
//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);

//   const fetchFollowers = async () => {
//     try {
//       const response = await axios.get(`${SummaryApi.getFollowers.url}/${userId}/followers`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setFollowers(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching followers:', error);
//     }
//   };

//   const fetchFollowing = async () => {
//     try {
//       const response = await axios.get(`${SummaryApi.getFollowings.url}/${userId}/followings`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setFollowing(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching following:', error);
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       fetchFollowers();
//       fetchFollowing();
//     }
//   }, [open]);

//   const renderUserList = (users) => {
//     return users.map((user) => (
//       <div key={user._id} className="flex items-center gap-3 p-3 border-b border-gray-200">
//         <Link to={`/${user?._id}/profile`} onClick={() => setOpen(false)} className="flex-shrink-0">
//           <Avatar>
//             <AvatarImage src={user.profilePicture} alt={user.username} />
//             <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
//           </Avatar>
//         </Link>
//         <div className="flex flex-col flex-grow">
//           <Link to={`/${user?._id}/profile`} onClick={() => setOpen(false)} className="text-sm font-semibold hover:underline">
//             {user.username}
//           </Link>
//           {activeTab === 'followers' ? (
//             <span className="flex items-center gap-1 text-xs text-[#3495d6] hover:text-[#204761] font-bold cursor-pointer">
//               <Dot className="text-xs" />
//               Follow
//             </span>
//           ) : (
//             <Button variant="secondary" className="text-xs mt-1 hover:bg-gray-200">
//               Following
//             </Button>
//           )}
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent onInteractOutside={() => setOpen(false)} className="w-full max-w-md p-4">
//         <DialogTitle className="flex justify-center items-center text-lg font-semibold">
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </DialogTitle>
//         <div className="flex justify-around border-b mb-4">
//           <button
//             className={`w-1/2 text-center py-2 ${activeTab === 'followers' ? 'border-b-2 border-blue-500' : ''}`}
//             onClick={() => setActiveTab('followers')}
//           >
//             Followers
//           </button>
//           <button
//             className={`w-1/2 text-center py-2 ${activeTab === 'following' ? 'border-b-2 border-blue-500' : ''}`}
//             onClick={() => setActiveTab('following')}
//           >
//             Following
//           </button>
//         </div>
//         <div className="overflow-y-auto max-h-[300px] w-full scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
//           {activeTab === 'followers' ? (
//             <div className="w-full">{renderUserList(followers)}</div>
//           ) : (
//             <div className="w-full">{renderUserList(following)}</div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FollowAndFollowers;
