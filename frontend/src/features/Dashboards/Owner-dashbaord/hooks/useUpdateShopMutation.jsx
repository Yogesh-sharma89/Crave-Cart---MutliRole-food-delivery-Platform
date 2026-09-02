import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateShopApi } from "../api/editShop";

const useUpdateShopMutation = () => {

    const queryClient  = useQueryClient();

    return useMutation({
        mutationKey:['update-shop'],
        mutationFn:({shopId,data})=>updateShopApi(shopId,data),

        onSuccess:()=>{

            queryClient.invalidateQueries({
                queryKey:['getAllShops']
            })
        }
    })
  
}

export default useUpdateShopMutation
