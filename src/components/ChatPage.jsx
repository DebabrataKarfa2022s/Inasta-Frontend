import { SummaryApi } from '@/common/index';
import { setSelectedUser } from '@/redux/authSlice';
import { setMessages } from '@/redux/chatSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Messages from './Messages';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCodeIcon, SmileIcon } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import EmojiPicker from 'emoji-picker-react';

const ChatPage = () => {

  const [textMessage, setTextMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { user, selectedUser,allUsers } = useSelector(store => store.auth);
  const { onlineUsers, messages } = useSelector(store => store.chat);
  const dispatch = useDispatch();

  console.log("all user form chat page : ", allUsers);

  const sendMessageHandler = async (receiverId) => {
    try {
      const response = await axios.post(`${SummaryApi.sendMessage.url}/${receiverId}`, { textMessage }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })

      console.log("response from sendmessage handler : ", response);

      if (response.data.success) {
        dispatch(setMessages([...messages, response.data.data]));
        setTextMessage("");
      }
    } catch (error) {
      console.log("error from send message handler : ", error);
    }
  }

  const emojiHandler = async () => {
    setOpenEmoji(!openEmoji);
  }

  const emojiClickHandler = (e) => {
    setTextMessage((prevText) => prevText + e.emoji);
    setOpenEmoji(false);
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    }
  }, [])


  return (
    <div className='flex md:ml-[16%] h-screen mt-12 md:mt-0 '>
      <section className=' md:w-1/4 my-8'>
        <h1 className=' font-bold mb-4 px-3 text-xl text-green-600 font-sans'>{user?.username}</h1>
        <hr className='mb-4 border-gray-300 ' />
        <div className='overflow-y-auto h-[80vh] '>
          {
            allUsers?.map(user => {
              const isOnline = onlineUsers.includes(user?._id);
              // const isOnline =true
              return (
                <div key={user?._id} onClick={() => dispatch(setSelectedUser(user))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col'>
                    <span className='font-medium'>{user?.username}</span>

                    <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`} >{isOnline ? 'online' : 'offline'}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>

      {
        selectedUser ? (
          <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
            <div className='md:flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10 hidden '>
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} alt="profilePhoto" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-medium font-serif'>{selectedUser?.username}</span>
              </div>
            </div>

            <Messages selectedUser={selectedUser} />

            <div className='flex items-center p-4 border-t border-t-gray-300 gap-2'>
              <SmileIcon onClick={emojiHandler} className='w-8 h-8 cursor-pointer hover:text-green-700'/>
              <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className="flex mr-2 focus-visible:ring-transparent" placeholder="Messages.." />
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
            </div>
          </section>
        ) : (
          <div className='flex flex-col items-center justify-center mx-auto'>
            <MessageCircleCodeIcon className='md:w-32 md:h-32 my-4 w-20 h-20' />
            <h1 className='font-medium'>Your messages</h1>
            <span>Send a message to start a chat.</span>
          </div>
        )
      }

<div>
          <Dialog open={openEmoji}>
            <DialogContent
              className="w-full h-full max-w-[22rem] max-h-[25rem] p-3 "
              onInteractOutside={() => setOpenEmoji(false)}
            >
              <div className="w-full h-full">
                <EmojiPicker onEmojiClick={(e) => { emojiClickHandler(e) }} open={openEmoji} className="w-full h-full max-w-[20rem] max-h-[24rem] " />
              </div>
            </DialogContent>
          </Dialog>
        </div>

    </div>
  )
}

export default ChatPage


