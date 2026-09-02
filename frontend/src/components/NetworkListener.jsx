import { useEffect } from 'react'
import useNetworkStore from '../store/network.store';

const NetworkListener = () => {

  const {setOnline,setOffline} = useNetworkStore();

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
