import React from 'react';
import { toast } from 'sonner';
import useShopStore from '../../../../store/shop.store';
import { useNavigate } from 'react-router';
import useShopForm from './useShopForm';

const useCreateShop = () => {
    
   const form = useShopForm();

    const { createShop, isCreating, error } = useShopStore();

    const onSubmit = async (data) => {

        const { shopName, city, state, address, country, pincode, shopImage } = data;
        if (!shopImage) {
            toast.error("Please upload shop image");
            return;
        }
        try {

            await toast.promise(createShop(data), {
                loading: "Creating your shop",
                success: () => {
                    reset()
                    navigate("/owner");

                    return "Shop created successfully"
                },
                error: (err) => err.message || error
            })


        } catch (err) {
            // Surface server-side / network errors inline instead of failing silently
            setError("root", {
                type: "server",
                message:
                    err?.response?.data?.message ||
                    "Something went wrong while creating your shop. Please try again.",
            });
        }
    };

    return {
      onSubmit,form,isCreating
    }
}

export default useCreateShop;
