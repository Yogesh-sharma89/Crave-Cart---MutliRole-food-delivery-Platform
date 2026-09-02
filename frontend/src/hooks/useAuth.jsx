import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import useAuthMutation from "../features/auth/hooks/useAuth"

const useAuth = () => {

    const { handleSubmit, control, watch, register, reset, setValue, formState: { errors, touchedFields } } = useForm({
        mode: "onChange", reValidateMode: "onChange", defaultValues: {
            role: "user"
        }
    });

    const [showPassword, setShowPassword] = useState(false)

    const role = watch("role");

    const navigate = useNavigate();

    const { Signup, Login, signupPending, loginPending } = useAuthMutation();

    const LoginFormSubmit = async (data) => {

        try {

            await toast.promise(Login({ data }), {
                loading: "Logging you in...",
                success: () => {
                    reset();
                    navigate('/', { replace: true });
                    return "Login successfull"
                },
                error: (err) => {
                    if (err.response?.status === 403 && err.response?.data?.status === "scheduled_for_deletion") {
                        navigate("/recover-account");
                        return (err.response.data.message || "Account is frozen.")
                    }

                    return err.response.data.message || "Failed to login"
                }
            }).unwrap()



        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    const SignupFormSubmit = async (data) => {
        try {

            await toast.promise(Signup({ data }), {
                loading: "Creating your account...",
                success: () => {
                    reset();
                    navigate(`/`, { replace: true });
                    return "Account created successfully"
                },
                error: (err) => {

                    if (err.response?.status === 403 && err.response?.data?.status === "scheduled_for_deletion") {
                         navigate("/recover-account");
                        return err.response.data.message || "Account is frozen."
                    }

                   return err.response?.data?.message || "Failed to register" 
                }
            }).unwrap()



        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        handleSubmit, showPassword, setShowPassword, role, setValue, register, errors, touchedFields,
        signupPending, loginPending, LoginFormSubmit, navigate, SignupFormSubmit, control
    }
}

export default useAuth
