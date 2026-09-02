
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"
import useCreateShopItem from "./useShopItemMutation";
import useUiStore from "../../../../../../store/ui.store.js"
import { toast } from "sonner";
import useUpdateShopItem from "./useUpdateShopItemMutation.jsx";
import { useParams } from "react-router";


const useItemForm = () => {

    const { closeModal, editingItem,isAddShopModalOpen } = useUiStore();
    const {shopId} = useParams();


    const { handleSubmit, reset, control, register, formState: { errors, isSubmitting } } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    })


    const { mutateAsync: AdditemMutation, isPending: addPending } = useCreateShopItem();

    const { mutateAsync: UpdateItemMutation, isPending: updatePending } = useUpdateShopItem();

    const onSubmit = async (data) => {
        try {

            if (editingItem) {

                await UpdateItemMutation({
                    data,
                    shopId:shopId,
                    itemId: editingItem._id.toString()
                })

                toast.success("Menu item updated successfully! 🛠️");
            } else {
                await AdditemMutation({
                    data,
                    currentShopId:shopId
                });
                toast.success("Item added to the menu successfully! 🎉");
            }

            reset();
            setPreviewUrl(null);
            closeModal();

        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Failed to add item. Please try again.";
            toast.error(errorMessage);
        }
    }

    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (editingItem) {

           const categoryId = editingItem.category?._id ? editingItem.category._id.toString():'';

            reset({
                itemName: editingItem.itemName || '',
                price: editingItem.price || '',
                category: categoryId,
                description: editingItem.description || '',
                isAvailable: editingItem.isAvailable ?? true,
                foodType: editingItem.foodType || '',
                preparationTime: editingItem.preparationTime || '',
            });

            if(editingItem.itemImageUrl){
                setPreviewUrl(editingItem.itemImageUrl);
            }else{
                setPreviewUrl(null);
            }
        } else {
            // Clear inputs completely if the user switches to "Add New Item" mode
            reset({
                itemName: '',
                price: '',
                category: '',
                description: '',
                isAvailable: true,
                foodType: '',
                preparationTime: '',
                itemImage:null
            });
        }
    }, [editingItem, reset, isAddShopModalOpen]);

    return {
        register, handleSubmit,editingItem, addPending, updatePending, onSubmit, errors, isSubmitting, Controller, control, previewUrl, setPreviewUrl
    }
}

export default useItemForm
