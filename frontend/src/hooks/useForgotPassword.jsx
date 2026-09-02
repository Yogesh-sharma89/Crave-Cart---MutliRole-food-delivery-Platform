import { useState } from 'react'
import { useNavigate } from 'react-router';
import useAuthStore from '../store/auth.store';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useForgotPasswordMutation from '../features/auth/hooks/useForgotPasswordMutation';

const useForgotPassword = () => {


  const navigate = useNavigate();

  const {  isMailSent, mailSent } = useAuthStore();

 const [email,setEmail] = useState("");

  const { handleSubmit,  register, formState: { errors }, reset } = useForm({
    mode: "onChange", defaultValues: {
      email: ""
    }
  });

  const {mutateAsync:forgotPassword,isPending:isSendingEmail,error} = useForgotPasswordMutation();


  const onSubmit = async (data) => {
    const {email} = data;
    try {

      await toast.promise(forgotPassword({email}), {
        loading: "Sending email verfication link on mail",
        success: () => {
          setEmail(data.email)
          mailSent();
          reset();
          return "Mail sent successfully.Please check your inbox"
        },
        error: (err) => err.response?.data?.message || error
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
