import { useMutation } from "@tanstack/react-query"
import ResetPasswordApi from "../api/ResetPassword"


const useResetPasswordMutation = () => {
 
    return useMutation({
        mutationKey:['reset-password'],
        mutationFn:ResetPasswordApi
    })
}

export default useResetPasswordMutation
