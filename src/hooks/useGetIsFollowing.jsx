import { SummaryApi } from "@/common/index";
import { setIsFollowing } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"


// const useGetIsFollowing = ({userId}) => {
//     const dispatch = useDispatch();
//     console.log("user id for follow : ", userId)

//     useEffect(()=>{

//         const fetchIsFollowing = async ()=>{
//             try {
//                 const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`,{
//                     withCredentials:true
//                 })
//                 console.log("response from fetch is following : ", response);

//                 if(response.data.success){
//                     if(response.data.message === "unfollow"){
//                         dispatch(setIsFollowing(false));
//                     }else if(response.data.message === "follow"){
//                         dispatch(setIsFollowing(true));
//                     }

//                 }else{
//                     console.log("response from fetch is following : ", response.data.message)
//                 }
//             } catch (error) {
//                 console.log("error form fetch is following function : ", error);
//             }
//         }

//         fetchIsFollowing();

//     },[userId])
  
// }

// export default useGetIsFollowing

const useGetIsFollowing = ({ userId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchIsFollowing = async () => {
            try {
                const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    if (response.data.message === 'unfollow') {
                        dispatch(setIsFollowing(false));
                    } else if (response.data.message === 'follow') {
                        dispatch(setIsFollowing(true));
                    }
                } else {
                    console.log('Error:', response.data.message);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchIsFollowing();
    }, [userId, dispatch]);

    // Return a function for follow/unfollow click
    return async () => {
        try {
            const response = await axios.post(`${SummaryApi.followOrUnfollow.url}/${userId}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                if (response.data.message === 'unfollow') {
                    dispatch(setIsFollowing(false));
                } else if (response.data.message === 'follow') {
                    dispatch(setIsFollowing(true));
                }
            } else {
                console.log('Error:', response.data.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
};

export default useGetIsFollowing;
