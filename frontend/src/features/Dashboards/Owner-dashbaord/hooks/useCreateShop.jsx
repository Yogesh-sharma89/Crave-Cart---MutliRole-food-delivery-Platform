
import { toast } from 'sonner';

import useShopForm from './useShopForm';
import { useNavigate } from 'react-router';
import useCreateShopMutation from './useCreateShopMutation';

const useCreateShop = () => {

    const form = useShopForm(null);

    const navigate = useNavigate();

     const { mutateAsync: createShop, isPending: isCreating } = useCreateShopMutation();

    const onSubmit = async (data) => {

        const { shopImage } = data;
        console.log(data);

        if (!shopImage) {
            toast.error("Please upload shop image");
            return;
        }
        try {

            await toast.promise(createShop({data}), {
                loading: "Creating your shop",
                success: () => {
                    return "Shop created successfully"
                },
                error: (err) => err.message || error
            })

            form.reset();
            navigate("/owner");

        } catch (err) {
            // Surface server-side / network errors inline instead of failing silently
            form.setError("root", {
                type: "server",
                message:
                    err?.response?.data?.message ||
                    "Something went wrong while creating your shop. Please try again.",
            });
        }
    };

    return {
        onSubmit, form, isCreating
    }
}

export default useCreateShop;
