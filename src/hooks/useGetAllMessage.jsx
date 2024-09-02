import { SummaryApi } from '@/common';
import { setMessages } from '@/redux/chatSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllMessage = () => {
    const dispatch =useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);

    useEffect(()=>{
        const fetchAllMessage = async()=>{
            try {
                const response = await axios.get(`${SummaryApi.getMessage.url}/${selectedUser?._id}`,{
                    withCredentials:true
                })
                console.log("response from getall message hook",response);

                if(response.data.success){
                    dispatch(setMessages(response.data.data));
                }
            } catch (error) {
                console.log("error from use getall message hook: ",error);
            }
        }
        fetchAllMessage();
    },[selectedUser])
 
}

export default useGetAllMessage
