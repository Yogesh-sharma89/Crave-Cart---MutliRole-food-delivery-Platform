import { Navigate } from "react-router";
import FullScreenLoader from "../features/auth/components/Loader";
import CraveCartErrorPage from "../page/CraveCartErrorPage";
import useAuthUser from "../features/auth/hooks/useAuthUser";

const RolbasedRoute = () => {

    const {isLoading,data:user,isError} = useAuthUser();

    if(isLoading){
        return <FullScreenLoader/>
    }

    if(isError){
        return <CraveCartErrorPage/>
    }

    if (!user) return <Navigate to="/login" replace />;

    if (user.role === "owner") return <Navigate to="/owner" replace />;
    if (user.role === "deliveryBoy") return <Navigate to="/delivery-boy" replace />;
    
    return <Navigate to="/user" replace />;

}

export default RolbasedRoute
