import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

const PasswordStep = ({ variants, register, errors, onSubmit,getValues ,loading,onBack}) => {

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    return (
        <motion.div
            key="password"
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
                <LockKeyhole size={28} />
            </div>


            <div className="text-center">

                <h1 className="text-3xl font-semibold text-neutral-900">
                    Create new password
                </h1>


                <p className="mt-3 text-sm text-neutral-500">
                    Choose a strong password to secure
                    your account.
                </p>

            </div>


            <form
                onSubmit={onSubmit}
                className="mt-9 space-y-6"
            >


                {/* New Password */}

                <div className="space-y-2">

                    <label
                        htmlFor="newPassword"
                        className="
                        block
                        text-sm
                        font-medium
                        text-neutral-800
                      "
                    >
                        New password
                    </label>


                    <div className="relative">

                        <LockKeyhole
                            size={18}
                            className="
                          absolute
                          left-5
                          top-1/2
                          -translate-y-1/2
                          text-neutral-400
                        "
                        />


                        <input
                            id="newPassword"
                            disabled={loading}
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }

                            placeholder="Create a strong password..."

                            {...register("newPassword", {

                                required:
                                    "New password is required",

                                minLength: {
                                    value: 8,

                                    message:
                                        "Password must be at least 8 characters",
                                },

                                validate: {

                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "Password needs an uppercase letter",


                                    hasLowercase: (value) =>
                                        /[a-z]/.test(value) ||
                                        "Password needs a lowercase letter",


                                    hasNumber: (value) =>
                                        /\d/.test(value) ||
                                        "Password needs a number",


                                    hasSpecialCharacter: (value) =>
                                        /[^A-Za-z0-9]/.test(value) ||
                                        "Password needs a special character",

                                },

                            })}

                            className="
                          w-full
                          rounded-2xl
                          border
                          border-neutral-800/70
                          bg-white
                          py-4
                          pl-12
                          pr-14
                          disabled:cursor-not-allowed
                          text-sm
                          outline-none
                          focus:border-[#a87335]
                          focus:ring-4
                          focus:ring-[#a87335]/10
                        "
                        />


                        <button
                            type="button"
                            
                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }

                            className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-neutral-400
                        "
                        >
                            {showPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }
                        </button>

                    </div>


                    {errors.newPassword && (

                        <p className="text-sm text-red-500">
                            {errors.newPassword.message}
                        </p>

                    )}

                </div>


                {/* Confirm Password */}

                <div className="space-y-2">

                    <label
                        htmlFor="confirmPassword"
                        className="
                        block
                        text-sm
                        font-medium
                        text-neutral-800
                      "
                    >
                        Confirm password
                    </label>


                    <div className="relative">

                        <LockKeyhole
                            size={18}
                            className="
                          absolute
                          left-5
                          top-1/2
                          -translate-y-1/2
                          text-neutral-400
                        "
                        />


                        <input
                            id="confirmPassword"
                            disabled={loading}
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }

                            placeholder="Confirm your password..."

                            {...register(
                                "confirmPassword",
                                {

                                    required:
                                        "Please confirm your password",

                                    validate: (value) =>
                                        value ===
                                        getValues(
                                            "newPassword"
                                        ) ||
                                        "Passwords do not match",

                                }
                            )}

                            className="
                          w-full
                          rounded-2xl
                          border
                          border-neutral-800/70
                          bg-white
                          py-4
                          pl-12
                          pr-14
                          disabled:cursor-not-allowed
                          text-sm
                          outline-none
                          focus:border-[#a87335]
                          focus:ring-4
                          focus:ring-[#a87335]/10
                        "
                        />


                        <button
                            type="button"

                            onClick={() =>
                                setShowConfirmPassword(
                                    (prev) => !prev
                                )
                            }

                            className="
                          absolute
                          right-4
                          disabled:cursor-not-allowed
                          top-1/2
                          -translate-y-1/2
                          text-neutral-400
                        "
                        >
                            {showConfirmPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }
                        </button>

                    </div>


                    {errors.confirmPassword && (

                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>

                    )}

                </div>


                {/* Password requirements */}

                <div
                    className="
                      rounded-2xl
                      border
                      border-[#a87335]/10
                      bg-[#a87335]/5
                      p-4
                    "
                >

                    <p className="text-sm font-medium text-neutral-800">
                        Password requirements
                    </p>


                    <div className="
                      mt-3
                      grid
                      gap-2
                      text-xs
                      text-neutral-600
                      sm:grid-cols-2
                    ">

                        {[
                            "At least 8 characters",
                            "One uppercase letter",
                            "One lowercase letter",
                            "One number",
                            "One special character",
                        ].map((rule) => (

                            <div
                                key={rule}
                                className="
                            flex
                            items-center
                            gap-2
                          "
                            >

                                <Check
                                    size={14}
                                    className="
                              text-[#a87335]
                            "
                                />

                                {rule}

                            </div>

                        ))}

                    </div>

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
                      disabled:cursor-not-allowed
                      bg-linear-to-r
                      from-[#b98243]
                      via-[#a87335]
                      to-[#94602b]
                      px-6
                      py-4
                      font-semibold
                      text-white
                    "
                >

                    Reset password

                    <ArrowRight size={20} />

                </motion.button>
                
                 <motion.button
                    type="button"
                    onClick={onBack}
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
                      gap-2
                      rounded-2xl
                      cursor-pointer
                      disabled:cursor-not-allowed
                      px-4
                      py-1
                      font-semibold
                      text-[#a87335]
                    "
                >

                   

                    <ArrowLeft size={20} />

                    Back

                </motion.button>


            </form>

        </motion.div>
    )
}

export default PasswordStep
