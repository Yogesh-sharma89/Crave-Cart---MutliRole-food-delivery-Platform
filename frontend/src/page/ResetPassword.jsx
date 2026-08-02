import React, { useEffect, useState } from 'react'
import { Navigate, useLoaderData, useNavigate, useParams } from 'react-router';
import useAuthStore from '../store/auth.store.js';
import { useForm } from 'react-hook-form';
import { IoMdArrowForward, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { AnimatePresence, motion } from "framer-motion";
import FullScreenLoader from '../features/auth/components/Loader.jsx';
import ExpiredLinkPage from './ExpiredLinkPage.jsx';
import { toast } from 'sonner';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { MdOutlineLockPerson } from 'react-icons/md';
import TogglePasswordBtn from '../features/auth/components/TogglePasswordBtn.jsx';
import PasswordResetSuccess from '../components/PasswordResetSuccess.jsx';

const ResetPassword = () => {

  const {token} = useParams()

  const data = useLoaderData();

  const [passwordResetDone,setPasswordResetDone] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const { isCheckingResetToken, error, resetPassword, isPasswordReseting } = useAuthStore();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const { password } = data;

    try {

      await toast.promise(resetPassword(token, password), {
        loading:"Reseting your password",
        success: () => {
          setPasswordResetDone(true);
          reset();
          return "Password reset successfully"
        },
        error: (err) => error || err.message
      })

    } catch (err) {
      console.log("Error in reset password component submit function ", err)
    }
  }

  return (
   passwordResetDone ? (
     <PasswordResetSuccess/>
   )
   :
   (
    <div className='w-full font-sans min-h-screen  flex items-center justify-center bg-primary-light'>
      <div className='w-full rounded-xl bg-white p-6 shadow-md max-w-lg '>

        {/* heading  */}

        <div onClick={() => navigate("/forgot-password")} className='w-full mb-4 flex cursor-pointer items-center gap-2'>

          <FaArrowLeftLong className='size-4 mt-0.5  text-primary' />
          <span className='text-base select-none font-medium text-primary'>back</span>

        </div>

        <div className='w-full mt-8 select-none flex flex-col items-center text-center gap-2'>
          <h1 className='text-center flex item-cener gap-2'>
            <MdOutlineLockPerson className='size-7 text-primary-active' />
            <span className='text-lg font-medium text-primary-active'>🔒 Reset Password   </span>
          </h1>

          <p className='text-zinc-500 mt-1 text-sm max-w-sm'>
            Create a new password for your CraveCart account Make it strong, secure, and easy for you to remember.
          </p>
        </div>


        {/* passwoord input  */}

        <form className='w-full flex flex-col gap-4 my-6' onSubmit={handleSubmit(onSubmit)}>

          <div className='w-full relative flex flex-col gap-1'>

            <label htmlFor='password '>Password</label>
            <input

              disabled={isCheckingResetToken || isPasswordReseting}
              type={showPassword ? "text" : "password"}
              {
              ...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`';])\S{8,64}$/,
                  message: "Password must be 8–64 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed."
                }
              })
              }
              placeholder='Enter your new password...'
              className='w-full border  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary disabled:cursor-not-allowed focus:outline-none focus:border-transparent transition-all duration-150'
            />

            {
              errors.password && <p className="text-red-500 font-medium my-1">{errors.password.message}</p>
            }

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:bg-zinc-200   absolute top-8  right-2 rounded-full p-1.5 cursor-pointer">
              {
                showPassword ? (<IoMdEye className="size-5 text-zinc-700" />)
                  :
                  (
                    <IoMdEyeOff className="size-5 text-zinc-700" />
                  )
              }
            </button>

          </div>

          <div className='w-full relative flex flex-col gap-1'>

            <label htmlFor='password '>Confirm Password</label>
            <input
              disabled={isCheckingResetToken || isPasswordReseting}
              type='password'
              {
              ...register("confirmPassword", {
                required: "ConfirmPassword is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`';])\S{8,64}$/,
                  message: "This also follow same rule as password follow"
                }
              })
              }
              placeholder='Enter your confirm password...'
              className='w-full border disabled:cursor-not-allowed  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-orange-600 focus:outline-none focus:border-transparent transition-all duration-150'
            />

            {
              errors.confirmPassword && <p className="text-red-500 font-medium my-1">{errors.confirmPassword.message}</p>
            }


          </div>

          <motion.button
            disabled={isCheckingResetToken || isPasswordReseting}
            className="relative disabled:cursor-not-allowed flex items-center justify-center text-center px-8 py-3.5 bg-linear-to-r from-primary via-primary/95 to-primary w-full text-white font-semibold rounded-xl shadow-2xl overflow-hidden cursor-pointer tracking-wide select-none outline-none group border border-white/10"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Animated Particle Border Ring Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -inset-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)] animate-pulse" />
            </div>

            {/* Content State Orchestration */}
            <AnimatePresence mode="wait">

              <motion.span
                key="idle-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-center mx-auto"
              >
                Reset password

                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <IoMdArrowForward className='size-5' />
                </motion.span>
              </motion.span>

            </AnimatePresence>

            {/* Ambient Subtle Background Light Flow */}
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          </motion.button>

        </form>

        <p className='text-center mx-auto text-zinc-600 text-sm'> By continuing, your old password will no longer work.  </p>



      </div>
    </div>
   )
  )
}

export default ResetPassword
