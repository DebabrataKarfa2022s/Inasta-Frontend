import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Camera, Heart, MessageCircle } from 'lucide-react';
import { setAuthUser } from '@/redux/authSlice';
import { SummaryApi } from '@/common/index';
import CreatePost from './CreatePost';
import FollowAndFollowers from './FollowAndFollowers';
import useGetUserProfile from '@/hooks/useGetUserProfile';

const Profile = () => {
  const { id: userId } = useParams();
  useGetUserProfile(userId);

  const [open, setOpen] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [followOrUnfollowTab, setFollowOrUnfollowTab] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const isFollowing = user.following.includes(userId);
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const handleTabChange = (tab) => setActiveTab(tab);

  const followOrUnfollow = async () => {
    try {
      const response = await axios.post(
        `${SummaryApi.followOrUnfollow.url}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.data);

        const updatedFollowing = isFollowing
          ? user.following.filter((id) => id !== userId)
          : [...user.following, userId];

        dispatch(setAuthUser({ ...user, following: updatedFollowing }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error in follow or unfollow function in profile:', error);
    }
  };

  const createPostHandler = () => setOpen(true);

  const handleFollowersClick = (tab) => {
    setFollowOrUnfollowTab(tab);
    setOpenFollowers(true);
  };

  const displayedPosts =
    activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex max-w-2xl lg:max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-start md:justify-center  '>
            <Avatar className='sm:w-32 sm:h-32 w-20 h-20 border'>
              <AvatarImage src={userProfile?.profilePicture} alt='Profile' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5 mt-10'>
              <div className='flex  items-center gap-2'>
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to='/account/edit'>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>
                        Edit Profile
                      </Button>
                    </Link>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden md:block'>
                      View archive
                    </Button>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8 hidden md:block'>
                      Add tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button onClick={followOrUnfollow} variant='secondary' className='h-8'>
                      Unfollow
                    </Button>
                    <Link to='/chat'>
                      <Button variant='secondary' className='h-8'>
                        Message
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button onClick={followOrUnfollow} className='bg-[#0095F6] hover:bg-[#3192d2]'>
                    Follow
                  </Button>
                )}
              </div>

              <div className='flex items-center gap-4 '>
                <p>
                  <span className='font-semibold'>{userProfile?.posts.length}</span> posts
                </p>
                <p
                  onClick={() => handleFollowersClick('followers')}
                  className='cursor-pointer'
                >
                  <span className='font-semibold'>{userProfile?.followers.length}</span> followers
                </p>
                <p
                  onClick={() => handleFollowersClick('following')}
                  className='cursor-pointer'
                >
                  <span className='font-semibold'>{userProfile?.following.length}</span> following
                </p>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>
                  {userProfile?.bio || 'Bio here...'}
                </span>
                <Badge className='w-fit' variant='secondary'>
                  <AtSign /> <span className='pl-1'>{userProfile?.username}</span>
                </Badge>
                <span>🤯 Learn code with YouTube</span>
                <span>🤯 Turning code into fun</span>
                <span>🤯 DM for collaboration</span>
              </div>
            </div>
          </section>
        </div>

        {/* <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span
              className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </span>
            {isLoggedInUserProfile && (
              <span
                className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`}
                onClick={() => handleTabChange('saved')}
              >
                SAVED
              </span>
            )}
            <span className='py-3 cursor-pointer'>REELS</span>
            <span className='py-3 cursor-pointer'>TAGS</span>
          </div>

          {displayedPosts.length > 0 ? (
            <div className=' grid grid-cols-1 sm:grid-cols-2 sm:pl-5 md:grid-cols-3 md:pl-14 lg:grid-cols-4 lg:pl-1 gap-1 '>
              {displayedPosts.map((post) => (
                <div key={post?._id} className='relative cursor-pointer'>
                  <img
                    src={post.image}
                    alt='Post'
                    className='rounded-sm my-2 w-40 h-40 aspect-square object-cover'
                  />
                  <div className='absolute inset-0 flex items-center justify-start md:justify-center bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center text-white space-x-3 bg-green-300 px-1 sm:space-x-0'>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <Heart className='font-bold' />
                        <span className='font-bold'>{post?.likes.length}</span>
                      </button>
                      <button className='flex items-center gap-2 hover:text-gray-300'>
                        <MessageCircle className='font-bold' />
                        <span className='font-bold'>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isLoggedInUserProfile ? (
            <div className='flex justify-center items-center m-6 flex-col gap-2'>
              <div className='border rounded-full w-20 h-20 flex justify-center items-center border-green-600'>
                <Camera className='w-12 h-12' />
              </div>
              <h1 className='font-bold text-3xl'>Share Photos</h1>
              <p className='font-semibold text-xs'>
                When you share photos, they will appear on your profile.
              </p>
              <span
                onClick={createPostHandler}
                className='cursor-pointer font-medium text-[#0095F6] hover:text-[#1d577b]'
              >
                Share your first photo
              </span>
            </div>
          ) : (
            <div className='flex justify-center items-center m-6 flex-col'>
              <div className='border rounded-full w-20 h-20 flex justify-center items-center border-red-600'>
                <Camera className='w-12 h-12' />
              </div>
              <span className='font-bold text-xl sm:text-3xl'>No Post Yet</span>
            </div>
          )}
        </div> */}

      </div>
      <CreatePost open={open} setOpen={setOpen} />
      <FollowAndFollowers
        open={openFollowers}
        setOpen={setOpenFollowers}
        userId={userId}
        activeTab={followOrUnfollowTab}
        setActiveTab={setFollowOrUnfollowTab}
      />
    </div>
  );
};

export default Profile;
