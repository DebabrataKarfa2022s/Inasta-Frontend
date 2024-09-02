import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, BookmarkCheckIcon, Dot, MessageCircle, MoreHorizontal, Send, SmileIcon } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { SummaryApi } from '@/common/index';
import { Link } from 'react-router-dom';
import useGetPostAge from '@/hooks/useGetPostAge';
import { setAuthUser } from '@/redux/authSlice';
import EmojiPicker from 'emoji-picker-react';

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false); // Add bookmark state
  const dispatch = useDispatch();
  const postAge = useGetPostAge(post?.createdAt);
  // Check if the logged-in user is following the post author
  const isFollowingAuthor = user.following.includes(post?.author?._id);

  // console.log("user from post page : ", user);
  

  const emojiHandler = async () => {
    setOpenEmoji(!openEmoji);
  }

  const emojiClickHandler = (e) => {
    setText((prevText) => prevText + e.emoji);
    setOpenEmoji(false);
  };
  
  const followORUnfollow = async (userId) => {
    try {
      const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, { withCredentials: true });

      if (response.data.success) {
        toast.success(response.data.data);

        // Update the userProfile following status
        let updatedFollowing;
        if (isFollowingAuthor) {
          updatedFollowing = user.following.filter(id => id !== userId);
        } else {
          updatedFollowing = [...user.following, userId];
        }

        // Dispatch the updated userProfile to Redux
        dispatch(setAuthUser({
          ...user,
          following: updatedFollowing
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Error in follow or unfollow function in post :', error);
    }
  };

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const response = await axios.get(`${SummaryApi.likeOrDislikePost.url}/${post._id}/${action}`, {
        withCredentials: true
      });

      if (response.data.success) {
        const updateLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updateLikes);
        setLiked(!liked);

        const updatedPostData = posts.map(p => p._id === post._id ? {
          ...p,
          likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
        } : p);
        dispatch(setPosts(updatedPostData));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error in like/dislike function:", error);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const response = await axios.get(`${SummaryApi.bookmarkPost.url}/${post._id}/bookmark`, { withCredentials: true });

      if (response.data.success) {
        setIsBookmarked(!isBookmarked); // Toggle bookmark state
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error in bookmark handler:", error);
    }
  };

  const commentHandler = async () => {
    try {
      const response = await axios.post(`${SummaryApi.commentPost.url}/${post._id}/comment`, { text }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (response.data.success) {
        const updateCommentData = [...comment, response.data.data];
        setComment(updateCommentData);

        const updatePostData = posts.map(p => p._id === post._id ? {
          ...p,
          comments: updateCommentData
        } : p);
        dispatch(setPosts(updatePostData));
        toast.success(response.data.message);
        setText("");
      }
    } catch (error) {
      console.error("Error in comment handler:", error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const response = await axios.delete(`${SummaryApi.deletePost.url}/${post?._id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPostData));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error in delete post:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='my-8 w-full sm:max-w-sm sm:mx-auto max-w-[90%]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link to={`/${post.author?._id}/profile`} className='cursor-pointer'>
            <Avatar>
              <AvatarImage src={post.author?.profilePicture} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div className='flex items-center '>
            <Link to={`/${post.author?._id}/profile`}>
              <h1>{post?.author?.username}</h1></Link><span><Dot className='text-gray-400' /></span>

            <span className='font-thin text-sm text-gray-400'>{postAge}</span>
            {user?._id !== post.author._id && !isFollowingAuthor && (<>
              <span><Dot className='text-gray-400' /></span>
              <span
                onClick={() => followORUnfollow(post.author._id)}
                className='font-bold text-xs text-[#139DF7] hover:text-[#356e93] cursor-pointer'>
                {/* {isFollowingAuthor ? 'Unfollow' : 'Follow'} */}
                Follow
              </span>
            </>)}
            {user?._id === post.author._id && <Badge variant="secondary" className="ml-2">Author</Badge>}
          </div>
        </div>

        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && isFollowingAuthor && (
              <Button
                onClick={() => followORUnfollow(post.author._id)}
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold">
                Unfollow
              </Button>
            )}
            <Button variant="ghost" className="cursor-pointer w-fit">Add to favorites</Button>
            {user && user?._id === post?.author._id && <Button onClick={deletePostHandler} variant="ghost" className="cursor-pointer w-fit">Delete</Button>}
          </DialogContent>
        </Dialog>
      </div>
      <img src={post.image} alt="postImage" className='rounded-sm my-2 w-full aspect-square object-cover' />

      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          {liked ? <FaHeart onClick={likeOrDislikeHandler} size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600' />}
          <MessageCircle onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }} className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        {isBookmarked ? <BookmarkCheckIcon onClick={bookmarkHandler} className='cursor-pointer hover:text-gray-600' /> : <Bookmark onClick={bookmarkHandler} className='cursor-pointer hover:text-gray-600' />}

      </div>

      <span className='font-medium block mb-2'>{postLike}</span>
      <p>
        <span className='font-medium mr-2'>{post.author?.username}</span>
        {post.caption}
      </p>

      {comment.length > 0 && (
        <span onClick={() => { dispatch(setSelectedPost(post)); setOpen(true); }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      <div className='flex items-center justify-between'>
        <input type="text"
          placeholder='Add a comment...'
          value={text}
          onChange={(e) => changeEventHandler(e)}
          className='w-full outline-none text-sm'
        />
        
        {text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer font-bold'>Post</span>}
        <SmileIcon onClick={emojiHandler} className='ml-2 w-4 h-4 cursor-pointer hover:text-green-700' />
      </div>
      <Dialog open={openEmoji}>
        <DialogContent
          className="w-full h-full sm:max-w-[22rem] sm:max-h-[25rem] p-3 max-w-[18rem] max-h-[22rem]"
          onInteractOutside={() => setOpenEmoji(false)}
        >
          <div className="w-full h-full">
            <EmojiPicker onEmojiClick={(e)=>{emojiClickHandler(e)}} open={openEmoji} className="w-full h-full sm:max-w-[20rem] sm:max-h-[24rem] max-w-[17rem] max-h-[21rem] " />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Post;



