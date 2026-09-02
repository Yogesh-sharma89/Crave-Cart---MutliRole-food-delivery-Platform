import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useVerifyEmail from "../server/useVerifyEmail";
import { toast } from "sonner";
import useVerifyOtp from "../server/useVerifyOtp";
import useResetPasswordMutation from "../../../auth/hooks/useResetPasswordMutation";


const useRecoverAccount = () => {

    const [step, setStep] = useState(1);

    const [recoveryEmail, setRecoveryEmail] =
        useState("");

    const [resendTimer, setResendTimer] =
        useState(30);

    const [token,setToken] = useState('');


    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors,
        },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });


    const { mutateAsync: VerifyEmail, isPending: mailVerificationPending } = useVerifyEmail();

    const handleSendCode = async (email) => {
        try {

            await toast.promise(VerifyEmail({ email }), {
                loading: "Sending verification code...",
                success: () => {
                    setStep(2);
                    setRecoveryEmail(email)
                    return "Verification code sent successfully"
                },
                error: (err) => err.response?.data?.message || "Failed to send verification code"
            }).unwrap()

        } catch (err) {
            console.log("Error in handle email sumbit :", err.message)
        }
    }

    const handleEmailSubmit = async (data) => {
        const { email } = data;

        await handleSendCode(email);
    }


    const { mutateAsync: VerifyOtp, isPending: otpVerificationPending } = useVerifyOtp();

    const handleOtpSubmit = async (data) => {
        const { otp } = data;
        console.log(otp,recoveryEmail)

        try {
            await toast.promise(VerifyOtp({ email: recoveryEmail, otp }), {
                loading: "Verifying Otp...",
                success: (res) => {
                    setToken(res?.token);
                    setStep(3);
                    return "Otp verified successfully"
                },
                error: (err) => err.response?.data?.message || "Failed to verify otp"
            }).unwrap()

        } catch (err) {
            console.log("Error in handle otp sumbit :", err.message)
        }
    }



    const { mutateAsync: resetPassword, isPending: isPasswordReseting } = useResetPasswordMutation();

    const handlePasswordSubmit = async (data) => {
        const {newPassword} = data;

        try{

            await toast.promise(resetPassword({token,password:newPassword}),{
                loading:"Reseting your password...",
                success:()=>{
                    setStep(4);
                    return "Password reset successsfully"
                },
                error:(err)=> err.response?.data?.message || "Failed to reset password"
            })

        }catch(err){
             console.log("Error in handle password in account recovery :",err);
        }
    }

    const handleResendCode = async (email) => {
        if (resendTimer > 0) return;
        await handleSendCode(email);
    }

    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);


    return {
        handleResendCode, handleEmailSubmit, handlePasswordSubmit, handleOtpSubmit,
        register, handleSubmit, errors, getValues,
        step, setStep, recoveryEmail, setRecoveryEmail, resendTimer,
        mailVerificationPending,otpVerificationPending,isPasswordReseting
    }
}

export default useRecoverAccount;
