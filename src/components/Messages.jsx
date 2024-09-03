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
