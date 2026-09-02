import { useForm } from "react-hook-form"
import useUpdatePasswordMutation from "../server/useUpdatePassword"
import { toast } from "sonner";
import { useNavigate } from "react-router";


const useUpdatePassword = () => {

   const {handleSubmit,reset,register,watch,getValues,formState:{errors}} = useForm({
    mode:"onBlur",
    reValidateMode:"onChange"
   })

   const navigate = useNavigate();

   const {mutateAsync:updatePassword,isPending} = useUpdatePasswordMutation();

   const onSubmit = async(data)=>{
    
     const {oldPassword,newPassword} = data;

     try{

        await toast.promise(updatePassword({oldPassword,newPassword}),{
            loading:"Updating your password...",
            success:()=>{
                reset();
                navigate("/profile");
                return "Password updated successfully"
            },
            error:(err)=>err.response?.data?.message || "failed to update password"
        })

     }catch(err){
        console.log("password update failed :",err.message)
     }
   }


  return {
    handleSubmit,onSubmit,reset,watch,errors,isPending,register,getValues
  }
}

export default useUpdatePassword
