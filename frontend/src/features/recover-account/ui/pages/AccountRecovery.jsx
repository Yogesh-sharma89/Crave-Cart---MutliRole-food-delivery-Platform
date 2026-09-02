

import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import EmailStep from "../components/EmailStep";
import OtpStep from "../components/OtpStep";
import PasswordStep from "../components/PasswordStep";
import useRecoverAccount from "../../hooks/ui/useRecoverAccount";
import LastStep from "../components/LastStep";
import { useEffect } from "react";


const AccountRecovery = () => {

    const {
       handleEmailSubmit, handlePasswordSubmit, handleOtpSubmit,
        register, handleSubmit, errors, getValues,
        step, setStep, recoveryEmail, resendTimer,mailVerificationPending
        ,otpVerificationPending,isPasswordReseting,handleResendCode
    } = useRecoverAccount();

    const shouldReduceMotion = useReducedMotion();

    

    /*
      Step Animation
    */

    const pageVariants = {
        initial: {
            opacity: 0,
            x: shouldReduceMotion ? 0 : 30,
        },

        animate: {
            opacity: 1,
            x: 0,
        },

        exit: {
            opacity: 0,
            x: shouldReduceMotion ? 0 : -30,
        },
    };

    useEffect(()=>{

        const handleBeforeLoad = (e)=>{
            e.preventDefault();

             e.returnValue = 'If you reload, your progress will be reset.'
             return e.returnValue;
        }

        window.addEventListener("beforeunload",handleBeforeLoad);

        return ()=>window.removeEventListener("beforeunload",handleBeforeLoad)
    },[])


    return (
        <div
            className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#f7f6f3]
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
        >

            <motion.div
                animate={
                    shouldReduceMotion
                        ? {}
                        : {
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }
                }
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#a87335]/10
          blur-3xl
        "
            />


            <motion.div
                animate={
                    shouldReduceMotion
                        ? {}
                        : {
                            x: [0, -30, 0],
                            y: [0, 20, 0],
                        }
                }
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute
          -bottom-32
          -right-32
          h-96
          w-96
          rounded-full
          bg-[#7a4b20]/10
          blur-3xl
        "
            />


            {/* Main Card */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="
          relative
          w-full
          max-w-xl
          overflow-hidden
          rounded-4xl
          border
          border-white/70
          bg-white/80
          shadow-[0_25px_80px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
        "
            >


                {/* Progress Bar */}

                <div className="flex gap-2 px-6 pt-6 sm:px-10">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="
                h-1.5
                flex-1
                overflow-hidden
                rounded-full
                bg-neutral-200
              "
                        >

                            <motion.div
                                initial={false}
                                animate={{
                                    width:
                                        step >= item
                                            ? "100%"
                                            : "0%",
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                                className="
                  h-full
                  rounded-full
                  bg-[#a87335]
                "
                            />

                        </div>

                    ))}

                </div>


                {/* Content */}

                <div className="p-6 sm:p-10">


                    <AnimatePresence mode="wait">


                        {/* STEP 1 */}

                        {step === 1 && (

                            <EmailStep 
                            key="email-step"
                            variants={pageVariants}
                                onSubmit={handleSubmit(handleEmailSubmit)}
                                register={register}
                                errors={errors}
                                loading={mailVerificationPending}
                            />

                        )}


                        {/* STEP 2 */}

                        {step === 2 && (

                            <OtpStep
                              key="otp-step"
                                variants={pageVariants}
                                onSubmit={handleSubmit(handleOtpSubmit)}
                                register={register}
                                errors={errors}
                                onBack={() => setStep(1)}
                                email={recoveryEmail}
                                timer={resendTimer}
                                loading={otpVerificationPending}
                                resendCode={handleResendCode}
                            />

                        )}


                        {/* STEP 3 */}

                        {step === 3 && (

                            <PasswordStep
                            key="password-step"
                                variants={pageVariants}
                                onSubmit={handleSubmit(handlePasswordSubmit)}
                                register={register}
                                errors={errors}
                                getValues={getValues}
                                loading={isPasswordReseting}
                                onBack={()=>setStep(2)}
                            />

                        )}


                        {/* STEP 4 */}

                        {step === 4 && (

                            <LastStep key={"final-step"} variants={pageVariants}/>

                        )}


                    </AnimatePresence>

                </div>

            </motion.div>

        </div>
    );
};


export default AccountRecovery;