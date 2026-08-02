import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useShopStore from '../../../../store/shop.store';
import useLocationStore from '../../../../store/location.store';
import { useNavigate } from 'react-router';

const useCreateShop = () => {

    const { location } = useLocationStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            shopName: "",
            city: "",
            state: location?.state ?? "",
            address: "",
            country: location?.country ?? "",
            pincode: location?.postcode ?? "",
            shopImage: ""
        },
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleFile = useCallback((file) => {

        if (!file) return;
        if (!file.type.startsWith("image/")) return;

        const MAX_FILE_SIZE = 5 * 1024 * 1024; //5 mb

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File is too large! Maximum limit is 5 MB")
            return;
        }

        setValue("shopImage", file, { shouldValidate: true, shouldDirty: true });

        const reader = new FileReader();

        reader.onload = (e) => setImagePreview(e.target.result);

        reader.readAsDataURL(file);

    }, [setValue]);


    const handleDrag = useCallback((e) => {

        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {

            setIsDragActive(true);

        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    }, []);


    const handleDrop = useCallback((e) => {

        e.preventDefault();
        e.stopPropagation();

        setIsDragActive(false);

        const file = e.dataTransfer.files?.[0];

        handleFile(file);

    }, [handleFile]);

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFile(file);
    };

    const removeImage = (e) => {

        e.stopPropagation();

        setImagePreview(null);

        setValue("shopImage", null, { shouldValidate: true, shouldDirty: true });
    };


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
        register, errors, isCreating, onSubmit, handleSubmit, setValue, handleDrag, handleDrop, handleFile,
        removeImage, handleInputChange, isDragActive, imagePreview
    }
}

export default useCreateShop
