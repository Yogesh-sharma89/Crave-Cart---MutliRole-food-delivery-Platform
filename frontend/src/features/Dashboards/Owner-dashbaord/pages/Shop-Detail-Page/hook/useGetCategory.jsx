import {useQuery} from "@tanstack/react-query";
import getCategories from "../api/getCategories";

const useCategories  =  ()=>{

    const {data:categories,isLoading,error} = useQuery({
       queryKey:['categories'],
       queryFn:getCategories,
       retry:2,
       retryDelay:10,
       staleTime:Infinity
    })

    return {
       categories ,isLoading,error
    }
}

export default useCategories;