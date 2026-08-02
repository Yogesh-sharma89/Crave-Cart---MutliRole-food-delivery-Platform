import React from 'react'
import useAuthStore from '../../../frontend/src/store/auth.store.js'
import {  Navigate, Outlet } from "react-router";
import FullScreenLoader from '../features/auth/components/Loader.jsx';

const ProtectedRoute = () => {
    const {isAuthenticated,isCheckingAuth,user}  = useAuthStore();

    if(isCheckingAuth){
        return (
        <FullScreenLoader/>
        )
    }

    if(!isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }

    if(!user?.phone && isAuthenticated){
     return (
      <Navigate to="/complete-profile" replace/>
     )
    }
  return (
    <>
      <Outlet/>
    </>
  )
}

export default ProtectedRoute
