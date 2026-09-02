import { useState } from "react";
import { useProfileAvatarMutation } from "../server/useprofileAvatarMutation";
import { toast } from "sonner"

const useProfileAvatar = () => {

    const [file, setFile] = useState(null);

    const { mutateAsync: updateAvatar, isPending:isAvatarUpdating } = useProfileAvatarMutation();

    const handleUpdateAvatar = async (e) => {

         const selectedFile = e.target.files?.[0]
         setFile(selectedFile);
         console.log(selectedFile)

        try {

            await toast.promise(updateAvatar({ file:selectedFile }), {
                loading: "Uploading Avatar...",
                success: () => {
                    setFile(null);
                    return "Profile picture updated successfully!";
                },
                error: (err) => err.response?.data?.message || "Upload failed"
            })

        } catch (err) {
            console.log('Fail to update avatar :',err);
        }
    }

    return {
   isAvatarUpdating,handleUpdateAvatar
    }
}

export default useProfileAvatar
