import { useQuery } from "@tanstack/react-query"
import getItemApi from "../api/getItem"

const useGetShopItems  = (shopId)=>{

 return useQuery({
    queryKey:['shop-items',shopId],
    queryFn:()=>getItemApi(shopId),
    enabled:!!shopId,
    retry:2,
    staleTime:10*60*1000 //10 minutes
 })

}

export default useGetShopItems;