import api from "../../../utils/api";



export const getCurrentUserApi = async () => {

    try {
        const { data } = await api.get("/auth/check-auth");

        return data.user;

    } catch (error) {

        // User is not logged in
        if (error.response?.status === 401) {
            return null;
        }

        // Actual error: network/server/etc.
        throw error;
    }
};