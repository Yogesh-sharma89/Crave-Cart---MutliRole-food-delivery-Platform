import React, { useEffect } from 'react'
import useShopStore from '../../../../store/shop.store'

const useGetShops = () => {

    const {getShops,isLoading,shops} = useShopStore();

    useEffect(()=>{
      getShops()
    },[])

    return {
        isLoading,shops
    }
  
}

export default useGetShops
