import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
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

import { useNavigate } from "react-router";
import { toast } from "sonner";
import useCreateShop from "../hooks/useCreateShop";


const CreateShop = () => {


    const { register, errors, isCreating, onSubmit, handleSubmit, setValue, handleDrag, handleDrop, handleFile, removeImage, handleInputChange, isDragActive, imagePreview } = useCreateShop();



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

                        {/* Form panel */}
                        <div className="px-6 py-8 sm:px-10 sm:py-10">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-[#231C12] sm:text-lg">
                                    Shop Information
                                </h3>
                                <p className="mt-1 text-sm text-[#8A7C68]">
                                    Tell us where your restaurant operates.
                                </p>
                            </div>

                            {errors.root && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                                >
                                    <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                                    <span>{errors.root.message}</span>
                                </motion.div>
                            )}

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                className="space-y-5"
                            >
                                <Field
                                    label="Shop Name"
                                    icon={<FiHome size={16} />}
                                    error={errors.shopName}
                                    placeholder="Coffee House"
                                    autoComplete="organization"
                                    registration={register("shopName", {
                                        required: "Shop name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Shop name must be at least 2 characters",
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "Shop name must be under 60 characters",
                                        },
                                    })}
                                />

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field
                                        label="City"
                                        icon={<FiMapPin size={16} />}
                                        error={errors.city}
                                        placeholder="New Delhi"
                                        autoComplete="address-level2"
                                        registration={register("city", {
                                            required: "City is required",
                                            minLength: {
                                                value: 2,
                                                message: "City must be at least 2 characters",
                                            },
                                        })}
                                    />

                                    <Field
                                        label="State"
                                        icon={<FiFlag size={16} />}
                                        error={errors.state}
                                        placeholder="Delhi"
                                        autoComplete="address-level1"
                                        registration={register("state", {
                                            required: "State is required",
                                            minLength: {
                                                value: 2,
                                                message: "State must be at least 2 characters",
                                            },
                                        })}
                                    />
                                </div>

                                {/* Address textarea */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#231C12]">
                                        Address
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Shop number, street, landmark..."
                                        autoComplete="street-address"
                                        {...register("address", {
                                            required: "Address is required",
                                            minLength: {
                                                value: 10,
                                                message:
                                                    "Address must be at least 10 characters",
                                            },
                                            maxLength: {
                                                value: 300,
                                                message: "Address must be under 300 characters",
                                            },
                                        })}
                                        className={`w-full scrollbar-none resize-none rounded-2xl border bg-[#F7F1E6] px-4 py-3 text-sm text-[#231C12] outline-none transition placeholder:text-[#A99A82] focus:bg-white focus:ring-4 ${errors.address
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                            : "border-[#1F1A12]/10 focus:border-[#B8823B]/70 focus:ring-[#B8823B]/15"
                                            }`}
                                    />
                                    {errors.address && (
                                        <ErrorText message={errors.address.message} />
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field
                                        label="Country"
                                        icon={<FiGlobe size={16} />}
                                        error={errors.country}
                                        placeholder="India"
                                        autoComplete="country-name"
                                        registration={register("country", {
                                            required: "Country is required",
                                            minLength: {
                                                value: 2,
                                                message: "Country must be at least 2 characters",
                                            },
                                        })}
                                    />

                                    <Field
                                        label="Pincode"
                                        icon={<FiHash size={16} />}
                                        error={errors.pincode}
                                        placeholder="110001"
                                        autoComplete="postal-code"
                                        inputMode="numeric"
                                        registration={register("pincode", {
                                            required: "Pincode is required",
                                            pattern: {
                                                value: /^[1-9][0-9]{5}$/,
                                                message: "Enter a valid 6-digit pincode",
                                            },
                                        })}
                                    />
                                </div>

                                {/* Shop image — drag & drop with preview */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#231C12]">
                                        Shop Photo
                                    </label>

                                    <div
                                        onDragEnter={handleDrag}
                                        onDragOver={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById("shopImageInput")?.click()}
                                        className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${isDragActive
                                            ? "border-[#B8823B] bg-[#B8823B]/5"
                                            : errors.shopImage
                                                ? "border-red-300 bg-red-50/40"
                                                : "border-[#1F1A12]/15 bg-[#F7F1E6] hover:border-[#B8823B]/60 hover:bg-[#B8823B]/5"
                                            }`}
                                    >
                                        <input
                                            id="shopImageInput"
                                            type="file"
                                            required
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />

                                        <AnimatePresence mode="wait">
                                            {imagePreview ? (
                                                <motion.div
                                                    key="preview"
                                                    initial={{ opacity: 0, scale: 0.96 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.96 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="relative w-full"
                                                >
                                                    <img
                                                        src={imagePreview}
                                                        alt="Shop preview"
                                                        className="mx-auto max-h-50 w-full rounded-xl object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute cursor-pointer  -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-[#231C12] text-white shadow-lg transition hover:bg-red-500"
                                                        aria-label="Remove image"
                                                    >
                                                        <FiX size={14} />
                                                    </button>
                                                    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8A7C68]">
                                                        <FiImage size={13} />
                                                        Click or drop to replace
                                                    </p>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="empty"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex flex-col items-center"
                                                >
                                                    <motion.div
                                                        animate={isDragActive ? { y: -4 } : { y: 0 }}
                                                        className={`mb-3 flex size-12 items-center justify-center rounded-2xl ${isDragActive ? "bg-[#B8823B] text-white" : "bg-white text-[#B8823B]"
                                                            } shadow-sm transition`}
                                                    >
                                                        <FiUploadCloud size={22} />
                                                    </motion.div>
                                                    <p className="text-sm font-medium text-[#231C12]">
                                                        {isDragActive ? "Drop your image here" : "Drag & drop your shop photo"}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#A99A82]">
                                                        or click to browse — PNG or JPG, up to 5MB
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {errors.shopImage && (
                                        <ErrorText message={errors.shopImage.message} />
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isCreating}
                                    whileHover={{ scale: isCreating ? 1 : 1.01 }}
                                    whileTap={{ scale: isCreating ? 1 : 0.98 }}
                                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-6 py-4 font-semibold text-white shadow-lg shadow-[#B8823B]/30 transition disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isCreating ? (
                                        <>
                                            <FiLoader className="animate-spin" size={18} />
                                            Creating Shop...
                                        </>
                                    ) : (
                                        <>
                                            Create Shop
                                            <FiArrowRight size={18} />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Reusable labeled input with icon + inline error state
const Field = ({
    label,
    icon,
    error,
    registration,
    placeholder,
    autoComplete,
    inputMode,
}) => (
    <div>
        <label className="mb-1.5 block text-sm font-medium text-[#231C12]">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99A82]">
                {icon}
            </span>
            <input
                type="text"
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                {...registration}
                className={`h-12 w-full rounded-2xl border bg-[#F7F1E6] pl-11 pr-4 text-sm text-[#231C12] outline-none transition placeholder:text-[#A99A82] focus:bg-white focus:ring-4 ${error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-[#1F1A12]/10 focus:border-[#B8823B]/70 focus:ring-[#B8823B]/15"
                    }`}
            />
        </div>
        {error && <ErrorText message={error.message} />}
    </div>
);

const ErrorText = ({ message }) => (
    <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
    >
        <FiAlertCircle size={12} />
        {message}
    </motion.p>
);

export default CreateShop;
