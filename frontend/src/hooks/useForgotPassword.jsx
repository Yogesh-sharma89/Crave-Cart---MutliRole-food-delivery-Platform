import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import useAuthStore from '../store/auth.store';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useForgotPassword = () => {


  const navigate = useNavigate();

  const { isSendingEmail, isMailSent, error, forgotPassword } = useAuthStore();

 const [email,setEmail] = useState("");

  const { handleSubmit,  register, getValues, formState: { errors }, reset } = useForm({
    mode: "onChange", defaultValues: {
      email: ""
    }
  });


  const onSubmit = async (data) => {
    try {

      await toast.promise(forgotPassword(data.email), {
        loading: "Sending email verfication link on mail",
        success: () => {
          setEmail(data.email)
          reset();
          return "Mail sent successfully.Please check your inbox"
        },
        error: (err) => err.message || error
      })


    } catch (err) {
      console.log("error in forgot password component :", err);
    }
  }

  return {
    navigate, isSendingEmail,isMailSent,error,handleSubmit,register,errors,onSubmit,reset,email

  }
}

export default useForgotPassword
