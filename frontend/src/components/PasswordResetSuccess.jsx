import React from 'react'
import { motion } from "framer-motion"

const PasswordResetSuccess = () => {
    return (
        <div className='w-full font-sans min-h-screen flex items-center justify-center bg-primary-light px-4'>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className='w-full max-w-lg rounded-xl bg-white p-8 shadow-md flex flex-col items-center text-center'
            >
                {/* animated checkmark badge */}
                <div className='relative mb-6 flex items-center justify-center size-20'>
                    <motion.span
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: [0.6, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                        className='absolute inset-0 rounded-full bg-success/20'
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 14 }}
                        className='relative flex items-center justify-center size-20 rounded-full bg-success-light border border-success/30'
                    >
                        <svg
                            viewBox="0 0 52 52"
                            className='size-9'
                            fill="none"
                        >
                            <motion.path
                                d="M14 27L22 35L38 17"
                                stroke="var(--color-success)"
                                strokeWidth={4}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                            />
                        </svg>
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.35 }}
                    className='text-lg font-medium text-primary-active'
                >
                    Password reset successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.35 }}
                    className='text-zinc-500 mt-2 text-sm max-w-sm'
                >
                    You can close this tab and return to your original login window.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className='w-16 h-1 rounded-full bg-primary/30 mt-6'
                />
            </motion.div>
        </div>
    )
}

export default PasswordResetSuccess;