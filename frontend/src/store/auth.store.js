import { create } from 'zustand';
import api from '../utils/api.js';
import { getErrorMessage } from '../utils/getErrorMessage.js';


const useAuthStore = create((set) => ({
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    isCheckingResetToken: false,
    isCheckingGoogleAuth: false,
    isProfilePending: false,
    isPasswordReseting: false,
    isOffline: false,


    isSendingEmail:false,
    isMailSent:false,

    signup: async (fullname, email, password, phone, role) => {
        set({ loading: true, error: null })
        try {

            const res = await api.post("/auth/signup", { fullname, email, password, phone, role });

            set({ user: res.data.user, isAuthenticated: true })


        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, isAuthenticated: false })
            throw new Error(message);

        } finally {
            set({ loading: false })
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null })

        try {

            const res = await api.post("/auth/login", { email, password });

            set({ user: res.data.user, isAuthenticated: true })

        } catch (error) {
            const message = getErrorMessage(error);
            set({ error: message, isAuthenticated: false })
            throw new Error(message);
        } finally {
            set({ loading: false })
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {

            const res = await api.get("/auth/check-auth");

            const user = res.data.user
            set({ user, isAuthenticated: Boolean(user) })

        } catch (err) {
            const message = getErrorMessage(err);
            if (!err.response) {
                set({ isOffline: true });
                throw new Error(message)
                return;
            }
            // Only a real authentication failure
            if (err.response.status === 401) {
                set({
                    isAuthenticated: false,
                    user: null,
                });
                throw new Error(message)
                return;
            }
            
            set({ error: message, isAuthenticated: false, user: null })
            throw new Error(message);
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    logout: async () => {
        set({ loading: true, error: null })
        try {

            await api.post("/auth/logout");

            set({ user: null, isAuthenticated: false })

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, isAuthenticated: false })
            throw new Error(message);
        } finally {
            set({ loading: false })
        }
    },

    forgotPassword: async (email) => {
        set({ isSendingEmail:true, error: null })
        try {

            await api.post("/auth/forgot-password", { email });

            set({isMailSent:true});

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, isAuthenticated: false })
            throw new Error(message);
        } finally {
            set({ isSendingEmail: false })
        }
    },

    checkToken: async (token) => {
        set({ isCheckingResetToken: true, error: null})
        console.log(token)

        try {

           const res =  await api.post('/auth/check-reset-token', { token });
           console.log("res data",res.data)
           
            return {
                ...res.data,isTokenValid:true
            }

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message })
            return {isTokenValid:false};
        } finally {
            set({ isCheckingResetToken: false })
        }
    },

    resetPassword: async (token, password) => {
        set({ isPasswordReseting: true, error: null })

        try {

            await api.post("/auth/reset-password", { token, password });

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, isAuthenticated: false, isTokenValid: false })
            throw new Error(message);
        } finally {
            set({ isPasswordReseting: false })
        }
    },
    
    googleAuth: async (idToken,role) => {
        console.log(role)
        set({ isCheckingGoogleAuth: true, error: null });
        try {

            const res = await api.post("/auth/google-auth", { idToken,role });

            const user = res.data.user;

            set({ user, isAuthenticated: true })

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, isAuthenticated: false })
            throw new Error(message);
        } finally {
            set({ isCheckingGoogleAuth: false })
        }
    },

    completeProfile: async (phone, email) => {
        set({ isProfilePending: true, error: null });

        try {

            const res = await api.post("/auth/update-phone", { phone, email });

            set({ user: res.data?.user, isAuthenticated: true })

        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message })
            throw new Error(message);
        } finally {
            set({ isProfilePending: false })
        }
    },


}))

export default useAuthStore;