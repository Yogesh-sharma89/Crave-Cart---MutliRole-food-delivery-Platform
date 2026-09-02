import {motion} from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const EmailStep = ({variants,onSubmit,register,errors,loading}) => {
  return (
    
              <motion.div
                key="email"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >

                {/* Icon */}

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
                    shadow-lg
                    shadow-[#a87335]/20
                  "
                >
                  <Mail size={28} />
                </div>


                <div className="text-center">

                  <h1
                    className="
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-neutral-900
                      sm:text-4xl
                    "
                  >
                    Account Recovery
                  </h1>


                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-sm
                      text-sm
                      leading-6
                      text-neutral-500
                    "
                  >
                    Enter your email address and we'll
                    send you a secure recovery code.
                  </p>

                </div>


                <form
                  onSubmit={onSubmit}
                  className="mt-9 space-y-6"
                >

                  <div className="space-y-2">

                    <label
                      htmlFor="email"
                      className="
                        block
                        text-sm
                        font-medium
                        text-neutral-800
                      "
                    >
                      Email address
                    </label>


                    <div className="relative group">

                      <Mail
                        size={19}
                        className="
                          pointer-events-none
                          absolute
                          left-5
                          top-1/2
                          -translate-y-1/2
                          text-neutral-400
                          group-focus-within:text-[#a87335]
                        "
                      />


                      <input
                        id="email"
                        type="email"
                        disabled={loading}
                        placeholder="Enter your email..."

                        {...register("email", {

                          required:
                            "Email address is required",

                          pattern: {
                            value:
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                            message:
                              "Please enter a valid email address",
                          },

                        })}

                        className={`
                          w-full
                          rounded-2xl
                          border
                          bg-white
                          py-3
                          pl-12
                          pr-5
                          disabled:cursor-not-allowed
                          text-sm
                          outline-none
                          transition-all
                          placeholder:text-neutral-400

                          ${
                            errors.email
                              ? `
                                border-red-400
                                focus:ring-4
                                focus:ring-red-100
                              `
                              : `
                                border-neutral-800/70
                                focus:border-[#a87335]
                                focus:ring-4
                                focus:ring-[#a87335]/10
                              `
                          }
                        `}
                      />

                    </div>


                    {errors.email && (

                      <p className="text-sm text-red-500">
                        {errors.email.message}
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
                      group
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      bg-linear-to-r
                      from-[#b98243]
                      via-[#a87335]
                      to-[#94602b]
                      px-6
                      py-3
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-[#a87335]/20
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >

                    
                       Send recovery code
                    


                    <ArrowRight
                      size={20}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />

                  </motion.button>

                </form>

              </motion.div>

  )
}

export default EmailStep
