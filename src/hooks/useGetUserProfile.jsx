import { setUserProfile } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SummaryApi } from "@/common/index";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    // console.log("user id from hook: ", userId)

    // const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `${SummaryApi.getProfile.url}/${userId}/profile`,
                    { withCredentials: true }
                );

                // console.log("response from get user profile hook", response);

                if (response.data.success) {
                    dispatch(setUserProfile(response.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserProfile();
    }, [userId]);
};

export default useGetUserProfile;
