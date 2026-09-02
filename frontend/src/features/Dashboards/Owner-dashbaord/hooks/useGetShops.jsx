

import {useQuery} from "@tanstack/react-query";
import { getAllShops } from '../api/getAllShop';

const useGetShops = () => {


   return useQuery({
        queryKey:['getAllShops'],
        queryFn:getAllShops,
        retry:2,
        staleTime:Infinity
    }) 

  
}

export default useGetShops
