import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateItemApi from "../api/updateItem";

const useUpdateShopItem = ()=>{

    const queryClient = useQueryClient();

    return useMutation({
      mutationKey:["update-item"],
      mutationFn:updateItemApi,

      onSuccess:(_,variables)=>{

        const {shopId} = variables;
        
        queryClient.invalidateQueries({
            queryKey:["shop-items",shopId]
        })

      }
    })
}

export default useUpdateShopItem;