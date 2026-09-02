import { toast } from "sonner";
import useAccountDeleteMutation from "../server/useAccountDeleteMutation"
import { useNavigate } from "react-router";
import { useState } from "react";


const useAccountDelete = () => {

    const { mutateAsync: deleteAccount, isPending } = useAccountDeleteMutation();

    const navigate = useNavigate();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleDelete = async () => {
        try {

            await toast.promise(deleteAccount(), {
                loading: "Deleting your account",
                success: () => {
                    setConfirmOpen(false);
                    navigate("/login");
                    return "Account deletion successfull"
                },
                error: (err) => err.response?.data?.message || "Failed to delete account"
            })

        } catch (err) {
            console.log('error in handle delete :', err.message)
        }
    }

    return {
        handleDelete, isPending, confirmOpen, setConfirmOpen
    }
}

export default useAccountDelete
