
import { motion } from "framer-motion";
import {
    FiHome,
    FiMapPin,
    FiFlag,
    FiGlobe,
    FiHash,
    FiAlertCircle,
    FiArrowRight,
    FiLoader,
    FiUploadCloud,
    FiX,
    FiImage,
} from "react-icons/fi";

import useCreateShop from "../hooks/useCreateShop";
import ShopForm from "../components/ShopForm";


const CreateShop = () => {

    const {onSubmit,isCreating,form} = useCreateShop();


    return (
        <div className="min-h-screen w-full bg-[#FBF7F0] px-4 py-10 sm:py-14">
            <div className="mx-auto w-full max-w-5xl">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center sm:mb-10"
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-linear-to-br from-[#B8823B] to-[#96652A] text-3xl shadow-lg shadow-[#B8823B]/30 sm:size-20 sm:text-4xl"
                    >
                        🏪
                    </motion.div>

                    <h1 className="text-2xl font-bold text-[#231C12] sm:text-3xl">
                        Create Your Shop
                    </h1>
                    <p className="mx-auto mt-2 max-w-md text-sm text-[#8A7C68] sm:text-base">
                        Set up your restaurant and start receiving orders from
                        thousands of hungry customers.
                    </p>

                    <div className="mx-auto mt-6 h-px w-full max-w-2xl bg-linear-to-r from-transparent via-[#1F1A12]/15 to-transparent" />
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="overflow-hidden rounded-3xl bg-white/85 shadow-[0_20px_60px_rgba(31,26,18,0.12)] ring-1 ring-[#1F1A12]/6 backdrop-blur-2xl"
                >
                    {/* Card intro */}
                    <div className="border-b border-[#1F1A12]/8 px-6 py-6 sm:px-10 sm:py-8">
                        <h2 className="text-lg font-bold text-[#231C12] sm:text-xl">
                            Create Your First Shop
                        </h2>
                        <p className="mt-1 text-sm text-[#8A7C68]">
                            Start selling on CraveCart in less than 2 minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
                        {/* Illustration panel — hidden on mobile */}
                        <div className="relative hidden overflow-hidden bg-linear-to-br from-[#F7F1E6] to-[#EFE4D0] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-10">
                            <motion.div
                                animate={{ y: [0, -14, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative flex size-40 items-center justify-center rounded-[2.5rem] bg-linear-to-br from-[#B8823B] to-[#96652A] text-7xl shadow-2xl shadow-[#B8823B]/40"
                            >
                                🏪
                            </motion.div>

                            <motion.span
                                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                                transition={{
                                    duration: 3.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute left-10 top-16 flex size-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg shadow-[#1F1A12]/10"
                            >
                                🍜
                            </motion.span>

                            <motion.span
                                animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
                                transition={{
                                    duration: 3.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.4,
                                }}
                                className="absolute bottom-20 left-16 flex size-12 items-center justify-center rounded-2xl bg-white text-xl shadow-lg shadow-[#1F1A12]/10"
                            >
                                📍
                            </motion.span>

                            <motion.span
                                animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8,
                                }}
                                className="absolute right-12 top-24 flex size-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg shadow-[#1F1A12]/10"
                            >
                                🛵
                            </motion.span>

                            <motion.span
                                animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
                                transition={{
                                    duration: 4.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2,
                                }}
                                className="absolute bottom-16 right-10 flex size-12 items-center justify-center rounded-2xl bg-white text-xl shadow-lg shadow-[#1F1A12]/10"
                            >
                                ⭐
                            </motion.span>

                            <div className="mt-10 max-w-xs text-center">
                                <p className="text-sm font-medium text-[#231C12]">
                                    Join 10,000+ restaurants
                                </p>
                                <p className="mt-1 text-xs text-[#8A7C68]">
                                    already growing their business with CraveCart.
                                </p>
                            </div>
                        </div>

                       <ShopForm
                       mode="create"
                       onSubmit={onSubmit}
                       form={form}
                       loading={isCreating}
                       />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};






export default CreateShop;
