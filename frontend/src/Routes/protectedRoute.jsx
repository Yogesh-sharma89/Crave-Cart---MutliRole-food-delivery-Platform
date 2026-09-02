
import {  Navigate, Outlet } from "react-router";
import useAuthUser from "../features/auth/hooks/useAuthUser";
import FullScreenLoader from "../features/auth/components/Loader";


const ProtectedRoute = () => {
   const {isLoading,data:user} = useAuthUser();

    if(isLoading){
        return (
        <FullScreenLoader/>
        )
    }

    const isAuthenticated = Boolean(user);

    if(!isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }

    if(!user.phone && isAuthenticated){
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
