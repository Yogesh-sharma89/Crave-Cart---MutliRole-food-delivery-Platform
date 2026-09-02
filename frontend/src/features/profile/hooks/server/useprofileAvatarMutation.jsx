import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAvatarApi } from "../../api/updateAvatar";

export const useProfileAvatarMutation = ()=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['update-avatar'],
        mutationFn:({file})=>updateAvatarApi(file),

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["current-user"]
            })
        }
    })
    
}