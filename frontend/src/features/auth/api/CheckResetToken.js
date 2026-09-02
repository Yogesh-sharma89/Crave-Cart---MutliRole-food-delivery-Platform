import api from "../../../utils/api";

const CheckResetTokenApi = async ( token ) => {
    if (!token) return null;

    try {

        const res = await api.post("/auth/check-reset-token", { token });
        return res.data;

    } catch (error) {
        console.log("Error in check reset token api :", error);

        if (error.response?.status === 404 || error.response?.status === 410) {
            return {
                success: false,
                isTokenValid: false,
                message: error.response.data?.message || "Invalid Link"
            };
        }
        throw error;
    }
}

export default CheckResetTokenApi;