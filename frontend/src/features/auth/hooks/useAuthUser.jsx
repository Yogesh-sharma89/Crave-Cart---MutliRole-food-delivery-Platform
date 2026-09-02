import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../api/getCurrentUser";


const useAuthUser = () => {

    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUserApi,
        staleTime: 15 * 60 * 1000,
        gcTime: 60 * 60 * 1000, //keep it in gc cache for one hour ,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })
}

export default useAuthUser
