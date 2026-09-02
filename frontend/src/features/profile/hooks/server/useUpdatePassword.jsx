import { useMutation, useQueryClient } from "@tanstack/react-query"
import UpdatePasswordApi from "../../api/updatePassword";

const useUpdatePasswordMutation = ()=>{
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['update-password'],
        mutationFn:UpdatePasswordApi,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['current-user']
            })
        }
    })
}

export default useUpdatePasswordMutation;