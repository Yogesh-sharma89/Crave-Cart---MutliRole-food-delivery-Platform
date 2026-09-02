import { create } from 'zustand';
import api from '../utils/api.js';
import { getErrorMessage } from '../utils/getErrorMessage.js';


const useAuthStore = create((set) => ({
    isCheckingResetToken: false,
    isCheckingGoogleAuth: false,
    isMailSent: false,

    mailSent:()=>set({isMailSent:true}),


    checkToken: async (token) => {
        set({ isCheckingResetToken: true, error: null })
        console.log(token)

        try {

            const res = await api.post('/auth/check-reset-token', { token });
            console.log("res data", res.data)

            return {
                ...res.data, isTokenValid: true
            }

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message })
            return { isTokenValid: false };
        } finally {
            set({ isCheckingResetToken: false })
        }
    },


}))

export default useAuthStore;