import { useMutation, useQueryClient } from "@tanstack/react-query"
import { googleAuthApi } from "../api/googleAuth"


const useGoogleAuth = () => {

    const queryClient = useQueryClient();
  
    return useMutation({
        mutationKey:['google-auth'],
        mutationFn:googleAuthApi,

        onSuccess:async()=>{
           await queryClient.invalidateQueries({
                queryKey:["current-user"],
                refetchType:"all"
            })
        }

    })
}

export default useGoogleAuth
