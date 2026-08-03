import React, { useEffect } from 'react'

import AppProvider from './AppProvider.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import useAuthStore from './store/auth.store.js';
import useNetworkStore from './store/network.store.js';
import FullScreenLoader from './features/auth/components/Loader.jsx';

const App = () => {

  const { isCheckingAuth, checkAuth } = useAuthStore();
  const { isOnline } = useNetworkStore();

  useEffect(() => {
    checkAuth();
  }, [])


  if (isCheckingAuth && isOnline) {
    return (
      <FullScreenLoader />
    )
  }


  return (
    <>

      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </>


  )
}

export default App
