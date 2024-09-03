import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SummaryApi } from '@/common/index';
import { setPosts } from '@/redux/postSlice';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal, SmileIcon } from 'lucide-react';
import Comment from './Comment';
import { Button } from './ui/button';
import EmojiPicker from 'emoji-picker-react';
import { setAuthUser } from '@/redux/authSlice';

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);
  const { selectedPost, posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  const isFollowingAuthor = user.following.includes(selectedPost?.author?._id);

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;

    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText('');
    }
  };

  const sendMessageHandler = async () => {
    try {
      const response = await axios.post(
        `${SummaryApi.commentPost.url}/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const updateCommentData = [...comment, response.data.data];
        setComment(updateCommentData);

        const updatePostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updateCommentData } : p
        );

        dispatch(setPosts(updatePostData));
        toast.success(response.data.message);
        setText('');
      }
    } catch (error) {
      console.log('error in sendMessagehandler : ', error);
    }
  };

  const emojiHandler = () => {
    setOpenEmoji(!openEmoji);
  };

  const emojiClickHandler = (e) => {
    setText((prevText) => prevText + e.emoji);
    setOpenEmoji(false);
  };

  const followORUnfollow = async () => {
    try {
      const response = await axios.post(
        `${SummaryApi.followOrUnfollow.url}/${selectedPost?.author?._id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.data);

        // Update the userProfile following status
        let updatedFollowing;
        if (isFollowingAuthor) {
          updatedFollowing = user.following.filter(
            (id) => id !== selectedPost?.author?._id
          );
        } else {
          updatedFollowing = [...user.following, selectedPost?.author?._id];
        }

        // Dispatch the updated userProfile to Redux
        dispatch(
          setAuthUser({
            ...user,
            following: updatedFollowing,
          })
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Error in follow or unfollow function in comment dialog :', error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="md:max-w-3xl p-0 flex flex-col max-w-sm max-h-[48rem] md:max-h-none "
      >
        <DialogTitle className="hidden">hi</DialogTitle>
        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-1/2 ">
            <img
              src={selectedPost?.image}
              alt="post_image"
              className="w-full h-full  object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="w-full max-h-[20rem] md:max-h-none md:w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link to={`/${selectedPost?.author?._id}/profile`}>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    className="font-semibold text-xs md:text-sm"
                    to={`/${selectedPost?.author?._id}/profile`}
                  >
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  {user?._id !== selectedPost?.author?._id && (
                    <div
                      onClick={followORUnfollow}
                      className={`cursor-pointer w-full font-bold ${
                        isFollowingAuthor
                          ? 'text-[#ED4956] hover:text-[#97202a]'
                          : 'text-[#139DF7] hover:text-[#1e699b]'
                      }`}
                    >
                      {isFollowingAuthor ? 'Unfollow' : 'Follow'}
                    </div>
                  )}
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>

            <hr />

            <div className="flex flex-col  md:flex-1 overflow-y-scroll max-h-64  md:max-h-96 p-4">
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <SmileIcon
                  onClick={emojiHandler}
                  className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:text-green-700"
                />
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment..."
                  className="w-full outline-none text-sm p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Dialog open={openEmoji}>
            <DialogContent
              className="w-full h-full max-w-[22rem] max-h-[25rem] p-3"
              onInteractOutside={() => setOpenEmoji(false)}
            >
              <div className="w-full h-full">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    emojiClickHandler(e);
                  }}
                  open={openEmoji}
                  className="w-full h-full max-w-[20rem] max-h-[24rem]"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
