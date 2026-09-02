import api from "../../../utils/api"

const ResetPasswordApi = async ({ token, password }) => {
    try {
        const res = await api.post("/auth/reset-password", { token, password });
        return res.data
    } catch (err) {
        console.log("Error in reset password api :", err);
        throw err;
    }
}

export default ResetPasswordApi;