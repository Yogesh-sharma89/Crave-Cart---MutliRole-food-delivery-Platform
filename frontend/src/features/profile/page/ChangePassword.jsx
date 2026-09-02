import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import useUpdatePassword from "../hooks/ui/useUpdatePassword";


const PasswordInput = ({
  label,
  name,
  placeholder,
  register,
  error,
  validation = {},
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">

      {/* Label */}
      <label
        htmlFor={name}
        className="block text-[15px] font-medium tracking-wide text-neutral-800"
      >
        {label}
      </label>


      {/* Input */}
      <div className="relative group">

        {/* Left icon */}
        <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center">
          <LockKeyhole
            size={19}
            className="
              text-neutral-800
              transition-colors
              duration-300
              group-focus-within:text-[#a3641b]
            "
          />
        </div>


        <input
          id={name}
          disabled={disabled}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name, validation)}
          className={`
            w-full
            rounded-2xl
            border
            bg-white/70
            py-3
            pr-14
            pl-12
            text-[14px]
            text-neutral-900
            outline-none
            backdrop-blur-sm
            transition-all
            duration-300
            placeholder:text-neutral-400

            ${error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : `
                  border-neutral-800/70
                  focus:border-[#a87335]
                  focus:ring-4
                  focus:ring-[#a87335]/10
                `
            }
          `}
        />


        {/* Show password */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            inset-y-0
            right-4
            cursor-pointer
            flex
            items-center
            justify-center
            text-neutral-400
            transition
            hover:text-[#a87335]
            active:scale-90
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>


      {/* Error animation */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-500"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>

    </div>
  );
};



const ChangePassword = () => {

  const { handleSubmit, onSubmit, getValues, register, isPending, errors } = useUpdatePassword();


  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f7f6f3]
        px-4
        py-10
        sm:px-6
        lg:px-8
      "
    >

      {/* Decorative background */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-[#b07a3c]/10
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-32
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#8b5e2c]/10
          blur-3xl
        "
      />


      {/* Main container */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-xl items-center">

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
            w-full
            rounded-4xl
            border
            border-white/70
            bg-white/70
            p-6
            shadow-[0_20px_70px_rgba(0,0,0,0.08)]
            backdrop-blur-xl
            sm:p-10
          "
        >

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-9 text-center"
          >

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-linear-to-br
                from-[#c18a49]
                to-[#9b672e]
                text-white
                shadow-lg
                shadow-[#a87335]/20
              "
            >
              <ShieldCheck size={30} />
            </motion.div>


            <h1
              className="
                text-3xl
                font-semibold
                tracking-tight
                text-neutral-900
                sm:text-4xl
              "
            >
              Change Password
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500">
              Keep your account secure by choosing a strong new password.
            </p>

          </motion.div>


          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Old password */}
            <PasswordInput
              label="Old password"
              name="oldPassword"
              placeholder="Enter your old password..."
              register={register}
              error={errors.oldPassword}
              validation={{
                required: "Current password is required",
              }}
              disabled={isPending}
            />


            {/* New password */}
            <PasswordInput
              label="New password"
              name="newPassword"
              placeholder="Create a new password..."
              register={register}
              error={errors.newPassword}
              validation={{
                required: "New password is required",

                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },

                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain an uppercase letter",

                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain a lowercase letter",

                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "Password must contain a number",

                  hasSpecialCharacter: (value) =>
                    /[^A-Za-z0-9]/.test(value) ||
                    "Password must contain a special character",
                },
              }}
               disabled={isPending}
            />


            {/* Confirm password */}
            <PasswordInput
              label="Confirm new password"
              name="confirmPassword"
              placeholder="Confirm your new password..."
              register={register}
              error={errors.confirmPassword}
              validation={{
                required: "Please confirm your new password",

                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              }}
               disabled={isPending}
            />


            {/* Password helper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="
                flex
                gap-2
                rounded-2xl
                border
                border-[#a87335]/10
                bg-[#a87335]/5
                p-4
              "
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-[#a87335]"
              />

              <p className="text-sm leading-6 text-neutral-600">
                Use a strong password with a combination of uppercase,
                lowercase, numbers and special characters.
              </p>
            </motion.div>


            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="
                group
                relative
                flex
                w-full
                items-center
                justify-center
                gap-3
                overflow-hidden
                rounded-2xl
                bg-linear-to-r
                from-[#b98243]
                via-[#a87335]
                to-[#94602b]
                px-6
                py-3.5
                cursor-pointer
                text-md
                font-semibold
                tracking-wide
                text-white
                shadow-xl
                shadow-[#a87335]/20
                transition
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {/* Hover shine */}
              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-linear-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

              <span className="relative">
                {isPending
                  ? "Updating password..."
                  : "Update password"
                }
              </span>

              {!isPending && (
                <ArrowRight
                  size={24}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              )}

            </motion.button>

          </form>


          {/* Footer */}
          <p className="mt-7 text-center text-xs text-neutral-400">
            Your password is securely encrypted and protected.
          </p>

        </motion.div>

      </div>

    </div>
  );
};


export default ChangePassword;