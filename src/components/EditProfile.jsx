import { SummaryApi } from '@/common/index';
import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append('bio', input.bio);
    formData.append('gender', input.gender);
    if (input.profilePicture) {
      formData.append('profilePicture', input.profilePicture);
    }

    try {
      setLoading(true);
      const response = await axios.post(`${SummaryApi.editProfile.url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        const updateUserData = {
          ...user,
          bio: response.data.data?.bio,
          gender: response.data.data?.gender,
          profilePicture: response.data.data?.profilePicture,
        };
        dispatch(setAuthUser(updateUserData));
        toast.success(response.data.message);
        navigate(`/${user?._id}/profile`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto p-4 sm:p-6 md:p-8 mt-10 md:mt-0">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl text-center sm:text-left">Edit Profile</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 rounded-xl p-4 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profile_Photo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">{user?.bio || 'bio here...'}</span>
            </div>
          </div>

          <input
            type="file"
            ref={imageRef}
            onChange={fileChangeHandler}
            className="hidden"
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#318bc7] w-full sm:w-auto"
          >
            Change photo
          </Button>
        </div>

        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          {loading ? (
            <Button className="w-full sm:w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-full sm:w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
            >
              Save
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
