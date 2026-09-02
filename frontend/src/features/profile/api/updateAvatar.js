import api from "../../../utils/api.js"

export const updateAvatarApi = async(avatarFile)=>{

    const formData = new FormData();

    formData.append("avatar",avatarFile);

    const res = await api.patch("/user/update-avatar",formData);
    return res.data.user;
}