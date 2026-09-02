import { useEffect } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdMarkEmailRead, MdOutlineLockPerson } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion"
import { IoArrowForward, IoCheckmarkCircle } from "react-icons/io5";
import useForgotPassword from '../hooks/useForgotPassword.jsx';
import api from '../utils/api.js';


const ForgotPassword = () => {

    const { navigate, isSendingEmail,email, isMailSent, handleSubmit, register, errors, onSubmit } = useForgotPassword();

    useEffect(()=>{
        if(!isMailSent || !email){
            return;
        }

        let intervalId;

        const checkResetStatus = async()=>{
            try{

                const res = await api.get('/auth/check-reset-status',{
                    params:{email}
                });
                
                if(res.data && res.data.isResetCompleted){
                    //then clear interval 

                    clearInterval(intervalId);

                    navigate("/login")
                    window.close();
                }

            }catch(err){
              console.log(err.response.data.message || err)
            }
        }

        checkResetStatus();
        // run check immeditalety for first time ;

        intervalId = setInterval(checkResetStatus,5000);

        return ()=>{
            clearInterval(intervalId);
        }
    },[navigate,isMailSent,email])

    return (
        <div className='w-full font-sans min-h-screen  flex items-center justify-center bg-primary-light'>

            <div className='w-full rounded-xl bg-white p-6 shadow-md max-w-lg '>

                {/* heading  */}

                <div onClick={() => navigate("/login")} className='w-full mb-4 flex cursor-pointer items-center gap-2'>

                    <FaArrowLeftLong className='size-4 mt-0.5  text-primary' />
                    <span className='text-base select-none font-medium text-primary'>Back to login</span>

                </div>

                <AnimatePresence mode='wait'>
                    {
                        isMailSent ?
                            (
                                <motion.div
                                    key="mail-sent"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                    className='w-full mt-8 mb-4 flex flex-col items-center text-center gap-2'
                                >
                                    <div className='relative mb-2'>
                                        <div className='flex items-center justify-center size-16 rounded-full bg-primary-light border border-primary/20'>
                                            <MdOutlineLockPerson className='size-8 text-primary-active' />
                                        </div>
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 12 }}
                                            className='absolute -bottom-1 -right-1 flex items-center justify-center bg-white rounded-full'
                                        >
                                            <IoCheckmarkCircle className='size-6 text-green-600' />
                                        </motion.span>
                                    </div>

                                    <h1 className='text-lg font-medium text-primary-active flex items-center gap-2'>
                                        <MdMarkEmailRead className='size-6' />
                                        Email sent
                                    </h1>

                                    <p className='text-zinc-500 mt-1 text-sm max-w-sm'>
                                        We've sent a verification link to{" "}
                                        <span className='font-medium text-zinc-700'>{email}</span>.
                                        Please check your inbox.
                                    </p>
                                </motion.div>
                            )
                            :
                            (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                >


                                    <div className='w-full mt-8 select-none flex flex-col items-center text-center gap-2'>
                                        <h1 className='text-center flex item-cener gap-2'>
                                            <MdOutlineLockPerson className='size-7 text-primary-active' />
                                            <span className='text-lg font-medium text-primary-active'>Forgot Password</span>
                                        </h1>

                                        <p className='text-zinc-500 mt-1 text-sm max-w-sm'>No worries! Enter your email address and    we'll send you a secure verification link.</p>
                                    </div>


                                    {/* email input  */}

                                    <form className='w-full flex flex-col gap-4 my-6' onSubmit={handleSubmit(onSubmit)}>

                                        <div className='w-full flex flex-col gap-1'>

                                            <label htmlFor='email '>Email</label>
                                            <input
                                                disabled={isSendingEmail}
                                                type='email'
                                                {
                                                ...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                        message: "Invalid Email"
                                                    }
                                                })
                                                }
                                                placeholder='Enter your email...'
                                                className='w-full border  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all duration-150'
                                            />

                                            {
                                                errors.email && <p className="text-red-500 font-medium my-1">{errors.email.message}</p>
                                            }

                                        </div>

                                        <motion.button
                                            disabled={isSendingEmail}
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
                                                    Send verification link
                                                    {/* Sliding Arrow Icon */}
                                                    <motion.span
                                                        className="inline-block"
                                                        animate={{ x: [0, 4, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                                    >
                                                        <IoArrowForward className='size-5' />
                                                    </motion.span>
                                                </motion.span>

                                            </AnimatePresence>

                                            {/* Ambient Subtle Background Light Flow */}
                                            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                        </motion.button>

                                    </form>

                                </motion.div>
                            )
                    }

                </AnimatePresence>

            </div>
        </div>
    )
}

export default ForgotPassword
