import { create } from "zustand";
import { getErrorMessage } from "../utils/getErrorMessage";
import { createShopApi } from "../features/Dashboards/Owner-dashbaord/api/createShopApi";
import deleteShop from "../features/Dashboards/Owner-dashbaord/api/deleteShop";
import { toast } from 'sonner';

const useShopStore = create((set) => ({

    shops: [],

    currentShop:localStorage.getItem("currentShop") ?  JSON.parse(localStorage.getItem("currentShop")) : null,

    setCurrentShop: (shop) => set({ currentShop: shop }),

    clearCurrentShop: () => set({ currentShop: null }),



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

            set((state) => ({
                shops: [...state.shops, data.shop]
            }))

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message })
            throw new Error(message);
        } finally {
            set({ isCreating: false })
        }
    },

    updateShop: async (shopId, shopData) => {
        console.log("Shop id in shop store")
        set({ isUpdating: true, error: null })

        try {
            const updatedData = await editShop(shopId, shopData);

            set((state) => ({
                shops: [...state.shops, updatedData.shop]
            }))

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message })
            throw new Error(message);
        } finally {
            set({ isUpdating: false })
        }
    },

    deleteShop: async (shopId) => {
        if (!shopId) {
            toast.error("Please select a shop before deleting")
            return;
        }
        set({ isDeleting: true, error: null })
        try {

            const res = await deleteShop(shopId);

        } catch (err) {

        }
    }


}))

export default useShopStore;