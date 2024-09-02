import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa6";
import top from "../assets/top.json"
import Lottie from 'lottie-react';
const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    const goToBtn=()=>{
        window.scrollTo({top:0, left:0, behavior:"smooth"});
    }
    const listToScroll=()=>{
        let heightToHidden= 200;
        const winScroll=document.body.scrollTop || document.documentElement.scrollTop;

        if(winScroll>heightToHidden){
            setIsVisible(true);
        }
        else{
            setIsVisible(false);
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll", listToScroll);

        return ()=> window.removeEventListener("scroll", listToScroll);
    },[]);

  return (
    <div className='flex jusrify-center items-center bg-red-700'> 
        {isVisible && (
    <div className="font-medium w-8 h-8 md:w-12 md:h-12 rounded-full fixed bottom-5 right-5 z-50 flex justify-center items-center cursor-pointer" onClick={goToBtn}>
        <button>
        {/* <FaArrowUp className="text-white animate-bounce "/> */}
        <Lottie animationData={top} />
        </button>
      
    </div>
     )}
     </div>
    
  )
}


export default BackToTop