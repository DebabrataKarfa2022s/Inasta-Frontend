import { setPosts } from "@/redux/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SummaryApi } from "@/common/index";


const useGetAllPost = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const response = await axios.get(`${SummaryApi.getAllPosts.url}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setPosts(response.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
}

export default useGetAllPost;