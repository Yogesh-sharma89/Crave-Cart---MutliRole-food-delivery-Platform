import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteItemApi from "../api/deleteItem";


const useDeleteShopItem = () => {
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['delete-item'],
        mutationFn:deleteItemApi,

        onSuccess:(_,variables)=>{
            const {shopId} = variables;

            if(shopId){
                queryClient.invalidateQueries({
                    queryKey:['shop-items',shopId]
                })
            }
        }
    })
}

export default useDeleteShopItem