import {useMutation,useQueryClient} from "@tanstack/react-query";
import { completeProfileApi } from "../api/completeProfile";

const useCompleteProfile = () => {
   
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['complete-profile'],
        mutationFn:completeProfileApi,

        onSuccess:()=>{
            //refetc the current user 

            queryClient.invalidateQueries({
                queryKey:['current-user']
            })
        }
    })
}

export default useCompleteProfile
