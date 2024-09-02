import { setSuggestedUsers } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SummaryApi } from "@/common/index";


const useGetSuggestedUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUser = async () => {
            try {
                const response = await axios.get(
                    `${SummaryApi.getSuggestedUsers.url}`, { withCredentials: true });

                if (response.data.success) {
                    dispatch(setSuggestedUsers(response.data.data));
                }
            } catch (error) {
                console.log("error from get suggested user hook ",error);
            }
        };
        fetchSuggestedUser();
    }, []);
};

export default useGetSuggestedUser;

