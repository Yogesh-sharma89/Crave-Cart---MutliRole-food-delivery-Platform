import { Navigate, Outlet } from 'react-router';
import FullScreenLoader from '../features/auth/components/Loader';
import useAuthUser from '../features/auth/hooks/useAuthUser';


const ROLES = {
  user: "/user",
  owner: "/owner",
  deliveryBoy: "/delivery-boy",
};

const RoleRoute = ({allowedRoles}) => {

    const {isLoading,data:user} = useAuthUser();

    if(isLoading){
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
     <Outlet/>
    </>
  )
}

export default RoleRoute
