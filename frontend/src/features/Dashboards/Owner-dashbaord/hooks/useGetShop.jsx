import { useQuery } from "@tanstack/react-query"
import { getShopbyId } from "../api/getAllShop"

const useGetShop = (shopId)=>{

    return useQuery({
        queryKey:["shop",shopId],
        queryFn:()=>getShopbyId(shopId),
        enabled:!!shopId,
        retry:2,
        staleTime:Infinity
    })
}

export default useGetShop;