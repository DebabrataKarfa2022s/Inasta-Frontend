import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { setAuthUser } from '@/redux/authSlice';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { setLikeNotification } from '@/redux/rtnSlice';
import Searchbar from './Searchbar';
import icon2 from "../assets/icon2.json"
import icon3 from "../assets/icon3.json"
import Lottie from 'lottie-react';


const LeftSlidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSearchPage, setOpenSearchPage] = useState(false);
  const { likeNotification } = useSelector(store => store.realTimeNotification);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${SummaryApi.logout.url}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleNotificationClick = () => {
    dispatch(setLikeNotification({ type: 'clear' }));
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/${user?._id}/profile`);
    } else if (textType === 'Home') {
      navigate('/');
    } else if (textType === 'Messages') {
      navigate('/chat');
    } else if (textType === 'Search') {
      setOpenSearchPage(true);
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notifications' },
    { icon: <PlusSquare />, text: 'Create' },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
    },
    { icon: <LogOut />, text: 'Logout' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-20 px-4   border-b border-gray-300 md:border-0 md:border-r md:w-[13%] md:h-screen md:px-4 z-10 bg-white lg:w-[16%]">
      <div className="flex flex-row md:flex-col items-center justify-between md:justify-start md:items-start">
        <Lottie animationData={icon2} className='hidden md:block w-24 h-24 md:w-14 md:h-14' />
        <Lottie animationData={icon3} className=' md:hidden w-24 h-24 md:w-14 md:h-14' />
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible w-full md:w-auto">
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center gap-3 relative hover:bg-gray-200 cursor-pointer rounded-lg p-2 md:p-3 my-1 md:my-1.5 transition-colors duration-200"
            >
              {item.icon}
              <span className="hidden lg:inline">{item.text}</span>
              {item.text === 'Notifications' && likeNotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="icon" className="rounded-full h-5 w-5 bg-red-600 absolute bottom-6 left-6">
                      {likeNotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent onClick={handleNotificationClick}>
                    <div>
                      {likeNotification.length === 0 ? (
                        <p>No new notification</p>
                      ) : (
                        likeNotification.map((notification, index) => (
                          <div key={index} className="flex items-center gap-2 my-2 cursor-pointer">
                            <Avatar>
                              <AvatarImage src={notification.userDetails?.profilePicture} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">{notification.userDetails?.username}</span> liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
      <Searchbar open={openSearchPage} setOpen={setOpenSearchPage} />
    </div>
  );
};

export default LeftSlidebar;
