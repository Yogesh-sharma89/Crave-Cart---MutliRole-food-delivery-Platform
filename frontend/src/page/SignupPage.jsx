import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Controller, useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import { PhoneInput, defaultCountries } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ValidatePhone } from "../utils/validatePhone";
import SignInButton from "../features/auth/components/SignInButton";
import GoogleButton from "../features/auth/components/GoogleButton";
import useAuthStore from "../store/auth.store.js";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Seperator from "../components/Seperator.jsx";
import useAuth from "../hooks/useAuth.jsx";

const roleArr = ["user", "owner", "deliveryBoy"]

const SignupPage = () => {

  const { handleSubmit, showPassword, setShowPassword, role, setValue, register, errors, touchedFields,
    loading, error, navigate, SignupFormSubmit, control } = useAuth();


  return (
    <div className="w-full font-sans min-h-screen  flex items-center justify-center bg-primary-light">
      <div className="w-full rounded-xl bg-white p-6 shadow-md max-w-lg ">
        <div className="w-full mb-6">
          <h1 className="font-bold text-2xl text-primary mb-1">Crave Cart</h1>
          <p className="text-gray-600 text-sm">
            Create you account to get started with delicious food
          </p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(SignupFormSubmit)}>
          {/* fullname  */}
          <div className="flex flex-col w-full gap-2 ">
            <label
              htmlFor="fullname"
              className="text-base text-gray-700 font-medium"
            >
              Fullname
            </label>
            <input
              disabled={loading}
              {
              ...register("fullname", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z](?:[A-Za-z ]{1,48}[A-Za-z])?$/,
                  message: "Invalid fullname"
                },


              })
              }
              placeholder="Enter your full name..."
              required
              className="w-full border  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all duration-150"
              id="fullname"
            />

            {
              errors.fullname && <p className="text-red-500 font-medium my-1">{errors.fullname.message}</p>
            }
          </div>

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
                className="w-full border  pr-10  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all duration-150"
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

          {/* phone  */}
          <div className="flex flex-col w-full gap-2 ">
            <label
              htmlFor="phone"
              className="text-base text-gray-700 font-medium"
            >
              Mobile No.
            </label>

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                validate: ValidatePhone
              }}
              render={({ field }) => (
                <PhoneInput
                  disabled={loading}
                  defaultCountry="in"
                  value={field.value}
                  onChange={field.onChange}
                  countries={defaultCountries}
                  inputStyle={{
                    width: "100%",
                    padding: "10px"
                  }}
                  className="w-full border  rounded-lg px-3 py-1 text-sm  focus:ring-2 focus:ring-orange-600 focus:outline-none focus:border-transparent transition-all duration-150"
                />
              )}
            />

            {touchedFields.phone && errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}

          </div>

          {
            error && <p className="text-primary text-sm text-center my-2 mx-auto font-medium ">
              {error}
            </p>
          }

          {/* role  */}
          <div className="flex flex-col w-full gap-2 ">
            <label
              className="text-base text-gray-700 font-medium"
            >
              Role
            </label>
            <div className="flex items-center gap-4">

              {
                roleArr.map((r) => {
                  const activeRole = r === role;
                  return <button disabled={loading} key={uuidv4()} onClick={() => setValue("role",r)} type="button" className={`flex-1 px-3 cursor-pointer select-none text-sm font-medium py-2 border border-gray-300 rounded-xl text-center transition-colors duration-200
                  ${activeRole && 'bg-primary text-white hover:bg-primary-hover'}
                  `}>
                    {r}
                  </button>
                })
              }

            </div>


          </div>


          <div className="w-full">
            <SignInButton title={"Sign up"} />
          </div>

          <Seperator />

          <div className="w-full">
            <GoogleButton />
          </div>
        </form>

        <div className="w-full flex items-center justify-center mt-4 mb-2">
          <p className="font-medium">Already have an account? <span onClick={() => navigate("/login", { replace: true })} className="text-primary-active cursor-pointer hover:underline">Login</span></p>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;
