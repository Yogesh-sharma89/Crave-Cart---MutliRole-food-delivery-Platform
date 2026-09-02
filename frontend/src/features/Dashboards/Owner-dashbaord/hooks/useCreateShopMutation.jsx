import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShopApi } from "../api/createShopApi";


const useCreateShopMutation = () => {

     const queryClient  = useQueryClient();

     return useMutation({
        mutationKey:['create-shop'],
        mutationFn:({data})=>createShopApi(data),

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['getAllShops']
            })
        }
     })
  
}

export default useCreateShopMutation
