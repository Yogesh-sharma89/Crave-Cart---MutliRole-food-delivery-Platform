import { Navigate, Outlet } from 'react-router';
import FullScreenLoader from '../features/auth/components/Loader.jsx';
import useAuthUser from '../features/auth/hooks/useAuthUser.jsx';


const PublicRoute = () => {

  const {isLoading,data:user} = useAuthUser();

  if (isLoading) {
    return (
      <FullScreenLoader/>
    )
  }

  const isAuthenticated = Boolean(user);

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />
  }
  return (
    <>
       <Outlet/>
    </>
  )
}

export default PublicRoute
