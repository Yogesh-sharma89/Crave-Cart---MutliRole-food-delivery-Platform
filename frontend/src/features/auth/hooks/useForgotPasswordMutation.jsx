import { useMutation } from "@tanstack/react-query"
import ForgotPasswordApi from "../api/forgotPassword"

const useForgotPasswordMutation = () => {
  
return useMutation({
    mutationKey:['forgot-password'],
    mutationFn:ForgotPasswordApi
})
}

export default useForgotPasswordMutation
