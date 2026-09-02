import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LogoutApi } from "../api/auth";


const useLogout = () => {
  
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey:['logout'],
      mutationFn:LogoutApi,

      onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["current-user"]
        })
      }
    })
}

export default useLogout
