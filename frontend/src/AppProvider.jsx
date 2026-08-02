import React from 'react'
import NetworkListener from './components/NetworkListener'
import useNetworkStore from './store/network.store'
import NoInternetPage from './page/NoInternetPage';
import { Toaster } from 'sonner';
import AppRoutes from './Routes/AppRoutes';


const AppProvider = ({children}) => {
  
    const {isOnline} = useNetworkStore();

  return (
    <>

      <NetworkListener/>

      {
        !isOnline ? 
       ( <NoInternetPage/>)
        :
        (
            <>
            
              <Toaster
                position="top-right"
                expand={false}
                richColors
                closeButton
                theme="light"
              />

             {children}
              
            </> 
        )
      }
      
    </>
  )
}

export default AppProvider
