import React from 'react'
import {motion} from "framer-motion";
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';

const ShopEmptyState = () => {
    
     const navigate = useNavigate();

  return (
     <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1F1A12]/12 bg-white/60 px-6 py-20 text-center backdrop-blur-xl sm:py-28"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-linear-to-br from-[#B8823B] to-[#96652A] text-4xl shadow-lg shadow-[#B8823B]/30"
            >
                🏪
            </motion.div>

            <h2 className="text-xl font-bold text-[#231C12] sm:text-2xl">
                Your business starts here
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#8A7C68] sm:text-base">
                Create your first restaurant and start receiving orders today.
            </p>

            <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/owner/shops/new")}
                className="mt-7 flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#B8823B]/30"
            >
                <FiPlus size={17} />
                Create Shop
            </motion.button>
        </motion.div>
  )
}

export default ShopEmptyState
