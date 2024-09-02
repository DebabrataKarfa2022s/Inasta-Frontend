// import useGetAllMessage from '@/hooks/useGetAllMessage';
// import useGetRTM from '@/hooks/useGetRTM'
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Link } from 'react-router-dom';
// import { Button } from './ui/button';

// const Messages = ({ selectedUser }) => {
//   useGetRTM();
//   useGetAllMessage();
//   const { messages } = useSelector(store => store.chat);
//   const { user } = useSelector(store => store.auth);

//   return (
//     <div className='overflow-y-auto flex-1 p-4'>
//       <div className='flex justify-center'>
//         <div className='flex flex-col items-center justify-center'>
//           <Avatar className="h-20 w-20">
//             <AvatarImage src={selectedUser?.profilePicture} alt="photo" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>

//           <span className='font-medium font-serif'>{selectedUser?.username}</span>
//           <Link to={`/${selectedUser?._id}/profile`} ><Button className="h-8 my-2" variant="secondary">View Profile</Button></Link>
//         </div>
//       </div>

//       <div className='flex flex-col gap-3'>
//         {
//           messages && messages.map((msg) => {
//             // console.log("msg from message : ", msg._id)
//             return (
//               <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`} >
//                 <div className={`p-2 rounded-lg max-w-sx break-words ${msg.senderId === user?._id ? 'bg-green-500 text-white' : 'bg-blue-300 text-black'}`}>
//                   {msg.message}
//                 </div>
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

// export default Messages


import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';
import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();

  const { messages } = useSelector(store => store.chat);
  const { user } = useSelector(store => store.auth);

  return (
    <div className='flex flex-col h-full p-4 overflow-y-auto mt-8 md:mt-0'>
      <div className='flex flex-col items-center mb-4'>
        <Avatar className="md:h-24 md:w-24 w-16 h-16">
          <AvatarImage src={selectedUser?.profilePicture} alt="Profile picture" />
          <AvatarFallback>{selectedUser?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <span className='mt-2 text-xl font-medium'>{selectedUser?.username}</span>
        <Link to={`/${selectedUser?._id}/profile`}>
          <Button className="mt-2" variant="secondary">View Profile</Button>
        </Link>
      </div>

      <div className='flex flex-col gap-3'>
        {messages && messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-green-500 text-white' : 'bg-blue-300 text-black'}`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
