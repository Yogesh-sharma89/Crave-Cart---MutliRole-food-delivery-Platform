import { useMutation } from "@tanstack/react-query"
import VerifyOtpApi from "../../api/verifyOtp"


const useVerifyOtp = () => {
  
    return useMutation({
        mutationKey:['verify-otp'],
        mutationFn:VerifyOtpApi
    })
}

export default useVerifyOtp
