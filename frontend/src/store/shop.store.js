import { create } from "zustand";
import api from "../utils/api";
import { getErrorMessage } from "../utils/getErrorMessage";
import { createShopApi } from "../features/Dashboards/Owner-dashbaord/api/createShopApi";
import { getAllShops } from "../features/Dashboards/Owner-dashbaord/api/getAllShop";

const useShopStore = create((set) => ({

    shops: [],
    currentShop: null,
    currentShopId: null,

    setCurrentShop : (shop) => set({ currentShop: shop, currentShopId: shop._id }),

    clearCurrentShop: () => set({ currentShop: null, currentShopId: null }),


    //UI state 
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,

    //error 
    error: null,

    //shop actions 
    createShop: async (shopData) => {
        set({ isCreating: true, error: null });

        try {
            
            const data = await createShopApi(shopData);

            set({shops:[...shops,data?.shop]})

        } catch (err) {
            const message = getErrorMessage(err);
            set({error:message})
            throw new Error(message);
        }finally{
            set({isCreating:false})
        }
    },

    getShops:async()=>{
        set({error:null,isLoading:true});

        try{
            const data = await getAllShops();
            set({shops:data?.shops})

        }catch(err){
            const message = getErrorMessage(err);
            set({error:message})
            throw new Error(message); 
        }finally{
            set({isLoading:false})
        }
    }


}))

export default useShopStore;