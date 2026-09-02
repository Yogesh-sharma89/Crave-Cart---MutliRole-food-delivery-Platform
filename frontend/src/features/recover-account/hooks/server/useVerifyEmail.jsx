import { useMutation } from "@tanstack/react-query"
import VerifyEmailApi from "../../api/verifyEmail"


const useVerifyEmail = () => {
 
    return useMutation({
        mutationKey:['verify-email'],
        mutationFn:VerifyEmailApi
    })
}

export default useVerifyEmail
