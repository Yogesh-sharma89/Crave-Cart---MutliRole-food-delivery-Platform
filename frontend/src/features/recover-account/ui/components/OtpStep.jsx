import {motion} from "framer-motion";
import { ArrowLeft, ArrowRight, KeyRoundIcon, RefreshCw } from "lucide-react";

const OtpStep = ({variants,email,onSubmit,register,errors,onBack,timer,loading,resendCode}) => {
    
  return (
      <motion.div
                key="otp"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >

                <div
                  className="
                    mx-auto
                    mb-6
                    flex
                    size-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-linear-to-br
                    from-[#c18a49]
                    to-[#9b672e]
                    text-white
                  "
                >
                  <KeyRoundIcon size={28} />
                </div>


                <div className="text-center">

                  <h1 className="text-3xl font-semibold text-neutral-900">
                    Verify your identity
                  </h1>


                  <p className="mt-3 text-sm leading-6 text-neutral-500">

                    We sent a verification code to

                    <span className="block font-medium text-neutral-800">
                      {email}
                    </span>

                  </p>

                </div>


                <form
                  onSubmit={onSubmit}
                  className="mt-9 space-y-6"
                >

                  <div className="space-y-2">

                    <label
                      htmlFor="otp"
                      className="
                        block
                        text-sm
                        font-medium
                        text-neutral-800
                      "
                    >
                      Verification code
                    </label>


                    <input
                      id="otp"
                      inputMode="numeric"
                      disabled={loading}
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="Enter 6-digit code"

                      {...register("otp", {

                        required:
                          "Verification code is required",

                        pattern: {
                          value: /^\d{6}$/,

                          message:
                            "Please enter a valid 6-digit code",
                        },

                      })}

                      className={`
                        w-full
                        rounded-2xl
                        border
                        bg-white
                        px-5
                        py-4
                        text-center
                        text-xl
                        font-semibold
                        tracking-[0.5em]
                        outline-none
                        transition-all

                        ${
                          errors.otp
                            ? "border-red-400"
                            : `
                              border-neutral-800/70
                              focus:border-[#a87335]
                              focus:ring-4
                              focus:ring-[#a87335]/10
                            `
                        }
                      `}
                    />


                    {errors.otp && (

                      <p className="text-sm text-red-500">
                        {errors.otp.message}
                      </p>

                    )}

                  </div>


                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      cursor-pointer
                      bg-linear-to-r
                      from-[#b98243]
                      via-[#a87335]
                      to-[#94602b]
                      disabled:cursor-not-allowed
                      px-6
                      py-4
                      font-semibold
                      text-white
                    "
                  >

                    Verify code

                    <ArrowRight size={20} />

                  </motion.button>


                  <div className="flex items-center justify-between">

                    <button
                      type="button"
                      onClick={onBack}
                      disabled={loading}
                      className="
                        flex
                        disabled:cursor-not-allowed
                        items-center
                        cursor-pointer
                        gap-2
                        text-sm
                        text-neutral-500
                        hover:text-neutral-900
                      "
                    >
                      <ArrowLeft size={16} />

                      Change email
                    </button>

                    {/* TODO - add handleresend code  */}
                    
                    <button
                      type="button"
                      disabled={timer > 0 || loading}
                      onClick={(email)=>resendCode(email)}

                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        cursor-pointer
                        disabled:cursor-not-allowed
                        font-medium
                        text-[#a87335]
                        disabled:text-neutral-400
                      "
                    >

                      <RefreshCw size={15} />

                      {timer > 0
                        ? `Resend in ${timer}s`
                        : "Resend code"
                      }

                    </button>

                  </div>

                </form>

              </motion.div>
  )
}

export default OtpStep
