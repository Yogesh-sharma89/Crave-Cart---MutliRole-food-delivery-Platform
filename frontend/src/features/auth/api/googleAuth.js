import api from "../../../utils/api";

export const googleAuthApi = async ({idToken, role}) => {

    if (!idToken.trim() || !role.trim()) {
        console.log("idtoken and role are not valid in google auth api");
        return;
    }

    try {
        const res = await api.post("/auth/google-auth", { idToken, role });
        return res.data.user;

    } catch (err) {
      console.log("Error in google auth api :",err.message)
      throw err;
    }


}