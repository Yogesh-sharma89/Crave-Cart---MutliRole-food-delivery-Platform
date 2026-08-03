import React from 'react'
import ShopForm from '../components/ShopForm'
import useUpdateShop from '../hooks/useUpdateShop';
import { motion } from "framer-motion";
import { Navigate } from 'react-router';

const EditShop = () => {

  const { onSubmit, form, isUpdating, currentShop } = useUpdateShop();

  console.log("edit shop :", currentShop)

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
            <img
              src={currentShop?.shopImage}
              alt={currentShop?.shopName}
              className='w-full h-full rounded-xl object-cover'
            />
          </motion.div>

          <h1 className="text-2xl font-bold text-[#231C12] sm:text-3xl">
            Update Your Shop
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8A7C68] sm:text-base">
            Update your restaurant and start receiving orders from
            thousands of hungry customers.
          </p>

          <div className="mx-auto mt-6 h-px w-full max-w-2xl bg-linear-to-r from-transparent via-[#1F1A12]/15 to-transparent" />
        </motion.div>

        <ShopForm
          form={form}
          onSubmit={onSubmit}
          loading={isUpdating}
          mode={"edit"}
        />

      </div>

    </div>
  )
}

export default EditShop
