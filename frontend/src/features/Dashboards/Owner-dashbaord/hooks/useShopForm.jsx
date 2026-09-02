import { useForm } from "react-hook-form"
import useLocationStore from "../../../../store/location.store";
import { useCallback, useEffect, useState } from "react";

const useShopForm = (Data) => {

    const { location } = useLocationStore();

    const { register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors } } = useForm({
            mode: "onChange",
            values: Data?._id ? {
                shopName: Data.shopName || "",
                city: Data.city || "",
                state: Data.state || "",
                address: Data.address || "",
                country: Data.country || "",
                pincode: Data.pincode || "",
                shopImage: Data.shopImage || ""
            } : {
                shopName: "",
                city: "",
                state: location?.state || "",
                address: "",
                country: location?.country || "",
                pincode: location?.postcode || "",
                shopImage: null
            },
            shouldUnregister: false,
            shouldFocusError: true

        })


    useEffect(() => {
        if (Data?.shopImage) {
            setImagePreview(Data.shopImage);
        } else {
            setImagePreview(null);
        }
    }, [Data?.shopImage]);

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

    return {
        register, errors, handleSubmit, setValue, handleDrag, handleDrop, handleFile,
        removeImage, handleInputChange, isDragActive, imagePreview, setError, reset,setValue
    }

}

export default useShopForm;