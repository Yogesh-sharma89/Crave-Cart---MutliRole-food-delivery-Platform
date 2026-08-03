import React, { useEffect } from 'react'
import useShopForm from './useShopForm'
import useShopStore from '../../../../store/shop.store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const useUpdateShop = () => {

  const { isUpdating, error, updateShop, currentShopId, currentShop } = useShopStore();


  const currentShopData = currentShop ||
    (typeof window !== "undefined" && localStorage.getItem("currentShop")
      ? JSON.parse(localStorage.getItem("currentShop"))
      : null);

  const shopId = currentShopId || 
  (typeof window!== "undefined" && localStorage.getItem("shopId")
   ? localStorage.getItem("shopId") : null
)

console.log(currentShop)


  const form = useShopForm(currentShopData);

  const {reset}  = form;

  const navigate = useNavigate();


  const onSubmit = async (data) => {

    const { shopName, city, state, address, country, pincode, shopImage } = data;

    if (!shopImage) {
      toast.error("Please upload shop image");
      return;
    }
    try {

      await toast.promise(updateShop(shopId, data), {
        loading: "Updating your shop",
        success: () => {
          reset();
          navigate("/owner");
          localStorage.removeItem("currentShop")
          return "Shop updated successfully"
        },
        error: (err) => err.message || error
      })


    } catch (err) {
      // Surface server-side / network errors inline instead of failing silently
      form?.setError("root", {
        type: "server",
        message:
          err?.response?.data?.message ||
          "Something went wrong while creating your shop. Please try again.",
      });
    }
  };

  useEffect(() => {
    if(currentShop){
       localStorage.setItem("currentShop", JSON.stringify(currentShop))
       localStorage.setItem("shopId",currentShopId);
    }
  }, [currentShop])

  return {
    onSubmit, form, isUpdating, currentShop
  }
}

export default useUpdateShop;
