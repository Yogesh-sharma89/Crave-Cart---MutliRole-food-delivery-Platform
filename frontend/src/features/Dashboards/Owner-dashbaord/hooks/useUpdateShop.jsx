
import useShopForm from './useShopForm'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router';
import useGetShop from './useGetShop';
import useUpdateShopMutation from './useUpdateShopMutation';

const useUpdateShop = () => {

  const { shopId } = useParams();

  const { data: currentShop, isLoading: isShopLoading } = useGetShop(shopId);

  const { mutateAsync: updateShop, isPending: isUpdating } = useUpdateShopMutation()

  const form = useShopForm(currentShop);

  const { reset, setError } = form;

  const navigate = useNavigate();


  const onSubmit = async (data) => {

    const { shopImage } = data;
    console.log(data)

    if (!shopImage) {
      toast.error("Please upload shop image");
      return;
    }
    try {

      await toast.promise(updateShop({ shopId, data }), {
        loading: "Updating your shop",
        success: () => {
          reset();
          navigate("/owner");
          return "Shop updated successfully"
        },
        error: (err) => {
          const serverMessage = err?.response?.data?.message;
          const clientMessage = err?.message;
          return serverMessage || clientMessage || "Failed to update shop";
        },
      })

    } catch (err) {
      useShopForm
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
    onSubmit, form, isUpdating, currentShop, isShopLoading
  }
}

export default useUpdateShop;
