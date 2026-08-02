import React, { useEffect } from 'react'
import useAuthStore from '../store/auth.store';

const NetworkListener = () => {

  const {isOnline,setOnline,setOffline} = useAuthStore();

  useEffect(()=>{

    window.addEventListener("online",setOnline);
    window.addEventListener("offline",setOffline)

    //clean up functions 
    return ()=>{
         window.removeEventListener("online",setOnline);
         window.removeEventListener("offline",setOffline)
    }
  },[])


  return null;
}

export default NetworkListener
