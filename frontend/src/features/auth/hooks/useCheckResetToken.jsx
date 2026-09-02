import { useQuery } from "@tanstack/react-query"
import CheckResetTokenApi from "../api/CheckResetToken"


const useCheckResetToken = (token) => {
 
    return useQuery({
        queryKey:["reset-token", token],
        queryFn:()=>CheckResetTokenApi(token),

        enabled:!!token,
        staleTime:5*60*1000,
        gcTime:5*60*1000,
        retry:1,
        refetchOnWindowFocus:false
    })
}

export default useCheckResetToken
