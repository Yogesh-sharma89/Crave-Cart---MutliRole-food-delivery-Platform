import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import React from "react";

import SignInButton from '../features/auth/components/SignInButton.jsx';
import GoogleButton from '../features/auth/components/GoogleButton.jsx';
import Seperator from '../components/Seperator.jsx';
import useAuth from '../hooks/useAuth.jsx';

const LoginPage = () => {


  const {
    handleSubmit, showPassword, setShowPassword, register, errors,
    loading, error, LoginFormSubmit, navigate
  } = useAuth();


  return (
    <div className="w-full font-sans min-h-screen  flex items-center justify-center bg-primary-light">
      <div className="w-full rounded-xl bg-white p-6 shadow-md max-w-lg ">
        <div className="w-full mb-6">
          <h1 className="font-bold text-2xl text-primary mb-1">Crave Cart</h1>
          <p className="text-gray-600 text-sm">
            Login into your account to get started with delicious food
          </p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(LoginFormSubmit)}>

          {/* email  */}
          <div className="flex flex-col w-full gap-2 ">
            <label
              htmlFor="email"
              className="text-base text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              disabled={loading}
              placeholder="Enter your email.."
              type="email"
              required
              className="w-full border  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all duration-150"
              id="email"
              {
              ...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid Email"
                }
              })
              }
            />
            {
              errors.email && <p className="text-red-500 font-medium my-1">{errors.email.message}</p>
            }
          </div>

          {/* password  */}
          <div className="flex flex-col w-full gap-2 ">
            <label
              htmlFor="password"
              className="text-base text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="w-full relative group">

              <input
                disabled={loading}
                placeholder="Enter your password.."
                type={showPassword ? "text" : "password"}
                minLength={8}
                required
                className="w-full border pr-10  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all duration-150"
                id="password"
                {
                ...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`';])\S{8,64}$/,
                    message: "Password must be 8–64 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed."
                  }
                })
                }
              />

              {
                errors.password && <p className="text-red-500 font-medium my-1">{errors.password.message}</p>
              }

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:bg-zinc-200   absolute top-0.5  right-2 rounded-full p-1.5 cursor-pointer">
                {
                  showPassword ? (<IoMdEye className="size-5 text-zinc-700" />)
                    :
                    (
                      <IoMdEyeOff className="size-5 text-zinc-700" />
                    )
                }
              </button>

            </div>

          </div>


          {/* forgot password  */}

          <div className='w-full text-left'>
            <p onClick={() => navigate("/forgot-password", { replace: true })} className='text-primary font-medium cursor-pointer hover:underline'>Forgot password?</p>
          </div>

          <div className="w-full">
            <SignInButton title={"Login"} />
          </div>

          <Seperator />

          <div className="w-full">
            <GoogleButton />
          </div>
        </form>



        <div className="w-full flex items-center justify-center mt-4 mb-2">
          <p className="font-medium">Don't have an account? <span onClick={() => navigate("/signup", { replace: true })} className="text-primary-active cursor-pointer hover:underline">Create</span></p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage;
