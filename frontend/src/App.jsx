import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import SignupPage from './page/SignupPage'
import LoginPage from './page/LoginPage'
import Home from './page/Home'
import { Toaster } from 'sonner';

import PublicRoute from './Routes/PublicRoute.jsx'
import useAuthStore from './store/auth.store.js'
import ForgotPassword from './page/ForgotPassword.jsx'
import ResetPassword from './page/ResetPassword.jsx'
import NotFoundPage from './page/NotFoundPage.jsx'
import ExpiredLinkPage from './page/ExpiredLinkPage.jsx'
import FullScreenLoader from './features/auth/components/Loader.jsx'
import CompleteProfile from './page/CompleteProfile.jsx'
import UserDashboard from './features/Dashboards/UserDashboard.jsx'
import DeliveryBoyDashboard from './features/Dashboards/DeliveryBoyDashboard.jsx'
import RoleRoute from './Routes/RoleRoute.jsx'
import useNetworkStore from './store/network.store.js'
import NetworkListener from './components/NetworkListener.jsx'
import NoInternetPage from './page/NoInternetPage.jsx'
import OwnerDashboard from './features/Dashboards/Owner-dashbaord/OwnerDashboard.jsx'
import OwnerAllShops from './features/Dashboards/Owner-dashbaord/components/OwnerAllShops.jsx'
import CreateShop from './features/Dashboards/Owner-dashbaord/components/CreateShop.jsx'
import ProtectedRoute from './Routes/protectedRoute.jsx'
import AppProvider from './AppProvider.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'

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
       <AppRoutes/>
     </AppProvider>


      {/* <Routes>

                <Route path='/' element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }>

                  <Route index element={
                    <RoleRoute allowedRoles={["user"]}>
                      <UserDashboard />
                    </RoleRoute>
                  } />
                  
                  <Route path='owner' >
                    <Route element={
                      <RoleRoute allowedRoles={["owner"]} /> //wrap all /admin route in role guard
                    }>
                      <Route index element={<OwnerDashboard />} />
                      <Route path='shops' element={<OwnerAllShops/> } />
                      <Route path='shops/new' element={<CreateShop/> } />
                    </Route>
                  </Route>
                  <Route path='delivery-boy' element={
                    <RoleRoute allowedRoles={["delivery-boy"]}>
                      <DeliveryBoyDashboard />
                    </RoleRoute>
                  } />
                </Route>
                <Route>

                </Route>
                <Route path='/signup' element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                } />
                <Route path='/login' element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path='/expire-link-page' element={<ExpiredLinkPage />} />
                <Route path='/complete-profile' element={<CompleteProfile />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes> */}
    </>


  )
}

export default App
