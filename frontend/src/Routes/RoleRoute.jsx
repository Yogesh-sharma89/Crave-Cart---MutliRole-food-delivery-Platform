import React from 'react'
import useAuthStore from '../store/auth.store'
import { Navigate, Outlet } from 'react-router';
import FullScreenLoader from '../features/auth/components/Loader';

const ROLES = {
  user: "/user",
  owner: "/owner",
  "delivery-boy": "/delivery-boy",
};

const RoleRoute = ({children,allowedRoles}) => {

    const {user,isCheckingAuth} = useAuthStore();

    if(isCheckingAuth){
      return (
        <FullScreenLoader/>
      )
    }

    if(!user){
        return (
            <Navigate to={"/login"} replace/>
        )
    }

    if(!allowedRoles?.includes(user.role)){
      const redirectRoute = ROLES[user.role] || '/user'
        return (
            <Navigate to={`${redirectRoute}`} replace/>
        )
    }
  return (
    <>
    { children ? children : <Outlet/>}
      
    </>
  )
}

export default RoleRoute
