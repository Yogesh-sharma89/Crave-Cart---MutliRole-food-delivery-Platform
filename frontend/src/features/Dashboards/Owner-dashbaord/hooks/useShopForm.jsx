import { useForm } from "react-hook-form"
import useShopStore from "../../../../store/shop.store";
import { useNavigate } from "react-router";
import useLocationStore from "../../../../store/location.store";
import { useCallback, useState } from "react";

const useShopForm = (Data) => {

    const { location } = useLocationStore();
    const navigate = useNavigate();

    const initialData =  JSON.parse(localStorage.getItem("currentShop")) ?? Data;


    const { register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors, isSubmitting }, } = useForm({
            defaultValues: initialData ||
            {
                shopName: "",
                city: "",
                state: location?.state ?? "",
                address: "",
                country: location?.country ?? "",
                pincode: location?.postcode ?? "",
                shopImage: ""
            }

        })



    const [imagePreview, setImagePreview] = useState(initialData?.shopImage || null);
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
        removeImage, handleInputChange, isDragActive, imagePreview,setError,reset
    }

}

export default useShopForm;