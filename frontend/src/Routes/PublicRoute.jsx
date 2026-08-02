import React from 'react'
import useAuthStore from '../store/auth.store.js'
import { FiLoader } from 'react-icons/fi';
import { Navigate, Outlet } from 'react-router';
import FullScreenLoader from '../features/auth/components/Loader.jsx';

const PublicRoute = ({ children }) => {

  const { loading, isAuthenticated } = useAuthStore();

  if (loading) {
    return (
      <FullScreenLoader/>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={'/user'} replace />
  }
  return (
    <>
      { children ? children : <Outlet/>}
    </>
  )
}

export default PublicRoute
