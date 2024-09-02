import { SummaryApi } from '@/common/index';
import { readFileAsDataURL } from '@/lib/utils';
import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, SmileIcon } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true)
      const response = await axios.post(`${SummaryApi.addPost.url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      console.log("response from addpostHandler : ", response);

      if (response.data.success) {
        dispatch(setPosts([response.data.data, ...posts]));
        toast.success(response.data.message);
        setOpen(false)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }

  const emojiHandler = async () => {
    setOpenEmoji(!openEmoji);
  }

  const emojiClickHandler = (e) => {
    setCaption((prevText) => prevText + e.emoji);
    setOpenEmoji(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="m-1">
        <DialogHeader className="text-center font-semibold">
          <DialogTitle className="hidden">hi</DialogTitle>
          Create New Post</DialogHeader>
        <div className=' flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h1 className='font-semibold text-xs'>{user?.username}</h1>
            <span className='text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <div className='flex justify-center'>
          <SmileIcon onClick={emojiHandler} className='mt-2 mr-1 hover:text-green-700 cursor-pointer' />
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." className="focus-visible:ring-transparent border-none" />
        </div>
        {
          imagePreview && (
            <div className='w-full h-64 flex items-center justify-center'>
              <img src={imagePreview} alt="previwImage" className='object-cover h-full rounded-md' />
            </div>
          )
        }

        <input type="file" ref={imageRef} onChange={fileChangeHandler} className='hidden' />
        <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]">
          <span className="block md:hidden">Select from mobile</span>
          <span className="hidden md:block lg:hidden">Select from tab</span>
          <span className="hidden lg:block">Select from computer</span>

        </Button>

        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                please wait
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
            )
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
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost



// import { SummaryApi } from '@/common/index';
// import { readFileAsDataURL } from '@/lib/utils';
// import { setPosts } from '@/redux/postSlice';
// import axios from 'axios';
// import React, { useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Textarea } from './ui/textarea';
// import { Button } from './ui/button';
// import { Loader2, SmileIcon } from 'lucide-react';
// import EmojiPicker from 'emoji-picker-react';

// const CreatePost = ({ open, setOpen }) => {
//   const imageRef = useRef();
//   const [file, setFile] = useState('');
//   const [caption, setCaption] = useState('');
//   const [openEmoji, setOpenEmoji] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const { posts } = useSelector((store) => store.post);
//   const dispatch = useDispatch();

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//       const dataUrl = await readFileAsDataURL(file);
//       setImagePreview(dataUrl);
//     }
//   };

//   const createPostHandler = async (e) => {
//     const formData = new FormData();
//     formData.append('caption', caption);
//     if (imagePreview) formData.append('image', file);

//     try {
//       setLoading(true);
//       const response = await axios.post(`${SummaryApi.addPost.url}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         dispatch(setPosts([response.data.data, ...posts]));
//         toast.success(response.data.message);
//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const emojiHandler = () => {
//     setOpenEmoji(!openEmoji);
//   };

//   const emojiClickHandler = (e) => {
//     setCaption((prevText) => prevText + e.emoji);
//     setOpenEmoji(false);
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         onInteractOutside={() => setOpen(false)}
//         className="max-w-lg mx-auto p-4 space-y-4"
//       >
//         <DialogHeader className="text-center font-semibold">
//           <DialogTitle className="hidden">hi</DialogTitle>
//           Create New Post
//         </DialogHeader>

//         <div className="flex gap-3 items-center">
//           <Avatar>
//             <AvatarImage src={user?.profilePicture} alt="img" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>

//           <div>
//             <h1 className="font-semibold text-sm">{user?.username}</h1>
//             <span className="text-gray-600 text-xs">Bio here...</span>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <SmileIcon
//             onClick={emojiHandler}
//             className="mt-2 mr-1 hover:text-green-700 cursor-pointer"
//           />
//           <Textarea
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             placeholder="Write a caption..."
//             className="focus-visible:ring-transparent border-none flex-1"
//           />
//         </div>

//         {imagePreview && (
//           <div className="w-full h-64 flex items-center justify-center my-2">
//             <img
//               src={imagePreview}
//               alt="previewImage"
//               className="object-cover h-full rounded-md"
//             />
//           </div>
//         )}

//         <input
//           type="file"
//           ref={imageRef}
//           onChange={fileChangeHandler}
//           className="hidden"
//         />
//         <Button
//           onClick={() => imageRef.current.click()}
//           className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]"
//         >
//           Select from computer
//         </Button>

//         {imagePreview && (
//           loading ? (
//             <Button disabled className="w-full mt-2">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait
//             </Button>
//           ) : (
//             <Button
//               onClick={createPostHandler}
//               type="submit"
//               className="w-full mt-2"
//             >
//               Post
//             </Button>
//           )
//         )}

//         <div>
//           <Dialog open={openEmoji}>
//             <DialogContent
//               className="w-full h-full max-w-[22rem] max-h-[25rem] p-3"
//               onInteractOutside={() => setOpenEmoji(false)}
//             >
//               <div className="w-full h-full">
//                 <EmojiPicker
//                   onEmojiClick={(e) => {
//                     emojiClickHandler(e);
//                   }}
//                   open={openEmoji}
//                   className="w-full h-full max-w-[20rem] max-h-[24rem]"
//                 />
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreatePost;
