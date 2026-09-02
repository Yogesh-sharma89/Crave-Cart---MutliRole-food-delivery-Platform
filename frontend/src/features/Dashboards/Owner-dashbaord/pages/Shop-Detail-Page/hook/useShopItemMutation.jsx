import { useMutation, useQueryClient } from "@tanstack/react-query"
import addItemApi from "../api/addItem";

const useCreateShopItem = ()=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['create-item'],
        mutationFn:addItemApi,

        onSuccess:(_,variables)=>{

            const {currentShopId} = variables;

            queryClient.invalidateQueries({
                queryKey:["shop-items",currentShopId],
                exact:false
            })
        }
    })
}
export default useCreateShopItem;