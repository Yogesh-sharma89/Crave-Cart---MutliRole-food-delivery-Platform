import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/auth.store';
import { toast } from 'sonner';

const useAuth = () => {

    const { handleSubmit, control, watch, register, reset, setValue, formState: { errors, touchedFields } } = useForm({ mode: "onChange", reValidateMode: "onChange" ,defaultValues:{
        role:"user"
    }});

    const [showPassword, setShowPassword] = useState(false)

    const role = watch("role");

    const navigate = useNavigate();

    const { loading, error, login,signup } = useAuthStore();

    const LoginFormSubmit = async (data) => {
        const { email, password } = data;
        try {

            await toast.promise(login(email, password), {
                loading: "Logging you in...",
                success: () => {
                    reset();
                    navigate('/user', { replace: true });
                    return "Login successfull"
                },
                error: (err) => err.message
            })

        } catch (err) {
            console.log(err.message);
            toast(err.message);
        }
    }

    const SignupFormSubmit = async (data) => {

        const { fullname, email, password, phone,role } = data;
        try {
    
          await toast.promise(signup(fullname, email, password, phone, role), {
            loading: "Creating your account...",
            success: () => {
              reset();
              navigate('/user', { replace: true });
              return "Account created successfully"
            },
            error: (err) => error || err.message
          })
    
        } catch (err) {
          console.log(err.message);
        }
      }


    return {
        handleSubmit,showPassword,setShowPassword,role,setValue,register,errors,touchedFields,
        loading,error,LoginFormSubmit,navigate,SignupFormSubmit,control
    }
}

export default useAuth
