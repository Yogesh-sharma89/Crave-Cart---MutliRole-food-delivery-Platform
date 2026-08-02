import { useEffect, useState } from "react";
import {
    FiMenu,
    FiX,
    FiMapPin,
    FiShoppingCart,
    FiPackage,
    FiUser,
    FiSearch,
    FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

import useLocationStore from "../../store/location.store";
import DetectLocationButton from "../location/components/DetectLocationBtn";
import ProfileMenu from "../Dashboards/Owner-dashbaord/components/ProfileMenu";

const cartItems = 3;

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false)

    const navigate = useNavigate();

    const { location } = useLocationStore();

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileOpen]);

    return (
        <>

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-999 mt-4 bg-[#FBF7F0]/0"

            >

                <div className="mx-auto max-w-7xl w-[94%] ">

                    <nav className="flex select-none  h-20 rounded-full bg-white/85 shadow-[0_20px_60px_rgba(31,26,18,0.12)] ring-1 ring-[#1F1A12]/6 backdrop-blur-2xl items-center justify-between gap-4 px-4 lg:px-8">



                        {/* Brand */}

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="flex  items-center max-md:gap-2 gap-3 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <div className="flex size-12 max-md:size-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#B8823B] to-[#96652A] shadow-lg shadow-[#B8823B]/30">
                                🍔
                            </div>

                            <div>
                                <h1 className=" max-md:text-lg text-xl font-bold text-[#231C12]">
                                    CraveCart
                                </h1>

                                <p className="text-xs text-[#8A7C68]">
                                    Fast. Fresh. Delivered.
                                </p>
                            </div>
                        </motion.div>

                        {/* Desktop */}

                        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">

                            {/* Location */}

                            {location ? <motion.button
                                whileHover={{ y: -2 }}
                                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] px-4 py-3 transition hover:border-[#B8823B]/50"
                            >
                                <FiMapPin className="text-[#B8823B]" />

                                <div className="text-left leading-tight">
                                    <p className="text-[11px] text-[#8A7C68]">
                                        Deliver To
                                    </p>

                                    <div className="flex items-center gap">
                                        <span className="max-w-[5ch] truncate whitespace-nowrap text-sm font-semibold text-[#231C12]">
                                            {location?.city}
                                        </span>
                                        {","}
                                        <span className="max-w-[5ch] truncate whitespace-nowrap  text-sm font-semibold text-[#231C12]">
                                            {location?.state}
                                        </span>
                                        {","}
                                        <span className="max-w-[5ch] truncate whitespace-nowrap  text-sm font-semibold text-[#231C12]">
                                            {location?.country}
                                        </span>
                                    </div>


                                </div>
                            </motion.button>

                                :
                                (
                                    <div>
                                        <DetectLocationButton />
                                    </div>
                                )

                            }

                            {/* Search */}

                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className="relative w-full max-w-lg"
                            >
                                <FiSearch
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99A82]"
                                    size={20}
                                />

                                <input
                                    type="search"
                                    placeholder="Search restaurants, food, pizza..."
                                    className="h-12 w-full rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] pl-12 pr-4 text-[#231C12] outline-none transition-all placeholder:text-[#A99A82] focus:border-primary/80 focus:bg-white focus:ring-4 focus:ring-[#B8823B]/15"
                                />
                            </motion.div>

                            {/* Orders */}

                            <motion.button
                                whileHover={{
                                    y: -2,
                                    scale: 1.02,
                                }}
                                whileTap={{ scale: .98 }}
                                className="flex cursor-pointer w-auto h-12 items-center gap-2 rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] px-4 font-medium text-[#231C12] transition hover:border-[#B8823B]/50 hover:bg-[#B8823B]/10"
                            >
                                <FiPackage size={18} />
                                <span className="text-xs">My Orders</span>
                            </motion.button>

                            {/* Cart */}

                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    rotate: -6,
                                }}
                                whileTap={{ scale: .95 }}
                                className="relative cursor-pointer flex py-3 px-4  items-center justify-center rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] text-[#231C12] transition hover:border-[#B8823B]"
                            >
                                <FiShoppingCart className="size-5" />

                                <motion.span
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                    }}
                                    className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#B8823B] text-2xs font-bold text-white"
                                >
                                    {cartItems}
                                </motion.span>
                            </motion.button>

                            {/* Profile */}



                        </div>

                        {/* Mobile Menu */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowProfile(!showProfile)}
                                    whileHover={{ scale: 1.06 }}
                                    className="flex relative max-md:p-2.5 lg:p-3 cursor-pointer items-center justify-center rounded-full border border-[#B8823B]/40 bg-linear-to-br from-[#B8823B] to-[#96652A] shadow-lg shadow-[#B8823B]/25"

                                >
                                    <FiUser className="text-white" size={20} />
                                </motion.button>

                                {showProfile && <div className="absolute  rounded-lg shadow-2xl  w-auto h-20 -bottom-26 -left-60">
                                    <ProfileMenu />
                                </div>}
                            </div>


                            <button
                                onClick={() => setMobileOpen(true)}
                                className="rounded-xl border cursor-pointer border-[#1F1A12]/10 bg-[#F7F1E6] p-2 text-[#231C12] lg:hidden"
                            >
                                <FiMenu className="size-6" />
                            </button>
                        </div>

                    </nav>
                </div>
            </motion.header>


            <AnimatePresence>

                {mobileOpen && (
                    <>

                        {/* Overlay */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-9998 bg-[#231C12]/40 backdrop-blur-md"
                        />

                        {/* Drawer */}

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: .35 }}
                            className="fixed right-0 top-0 z-9999 flex h-screen w-85 max-w-[92vw] flex-col bg-[#FBF7F0] shadow-2xl"
                        >

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-[#1F1A12]/10 p-5">

                                <div className="flex cursor-pointer items-center gap-3"
                                    onClick={() => navigate("/")}
                                >

                                    <div className="flex  h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#B8823B] to-[#96652A]">
                                        🍔
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-[#231C12]">
                                            CraveCart
                                        </h2>

                                        <p className="text-xs text-[#8A7C68]">
                                            Food Delivery
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg cursor-pointer p-2 text-[#231C12] hover:bg-[#1F1A12]/5"
                                >
                                    <FiX size={25} />
                                </button>

                            </div>

                            {/* Body */}

                            <div className="space-y-5 p-5">

                                {/* Location */}

                                {location ? <motion.button
                                    whileHover={{ y: -2 }}
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] px-4 py-3 transition hover:border-[#B8823B]/50"
                                >
                                    <FiMapPin className="text-[#B8823B]" />

                                    <div className="text-left leading-tight">
                                        <p className="text-[11px] text-[#8A7C68]">
                                            Deliver To
                                        </p>

                                        <div className="flex items-center gap">
                                            <span className="max-w-[6ch] truncate whitespace-nowrap text-sm font-semibold text-[#231C12]">
                                                {location?.city}
                                            </span>
                                            {","}
                                            <span className="max-w-[6ch] truncate whitespace-nowrap  text-sm font-semibold text-[#231C12]">
                                                {location?.state}
                                            </span>
                                            {","}
                                            <span className="max-w-[6ch] truncate whitespace-nowrap  text-sm font-semibold text-[#231C12]">
                                                {location?.country}
                                            </span>
                                        </div>


                                    </div>
                                </motion.button>
                                    :
                                    <DetectLocationButton />
                                }

                                {/* Search */}

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: .05 }}
                                    className="relative"
                                >
                                    <FiSearch
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99A82]"
                                    />

                                    <input
                                        placeholder="Search food..."
                                        type="search"
                                        className="h-12 w-full rounded-2xl border border-[#1F1A12]/10 bg-white pl-12 pr-4 text-[#231C12] outline-none focus:border-[#B8823B]"
                                    />
                                </motion.div>

                                {[
                                    {
                                        title: "My Orders",
                                        icon: <FiPackage size={20} />,
                                    },
                                    {
                                        title: `Cart (${cartItems})`,
                                        icon: <FiShoppingCart size={20} />,
                                    },
                                    {
                                        title: "My Profile",
                                        icon: <FiUser size={20} />,
                                    },
                                ].map((item, index) => (
                                    <motion.button
                                        key={item.title}
                                        initial={{
                                            opacity: 0,
                                            x: 40,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            delay: .12 + index * .08,
                                        }}
                                        whileHover={{
                                            x: 5,
                                        }}
                                        className="flex w-full items-center gap-4 rounded-2xl border border-[#1F1A12]/10 cursor-pointer bg-white p-4 text-left text-[#231C12] transition hover:border-[#B8823B]/50 hover:bg-[#B8823B]/10"
                                    >
                                        <div className="text-[#B8823B]">
                                            {item.icon}
                                        </div>

                                        <span className="font-medium">
                                            {item.title}
                                        </span>
                                    </motion.button>
                                ))}

                            </div>

                            {/* Footer */}

                            <div className="mt-auto border-t border-[#1F1A12]/10 p-5">

                                <div className="rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] p-5">

                                    <h3 className="font-semibold text-white">
                                        Hungry?
                                    </h3>

                                    <p className="mt-1 text-sm text-white/85">
                                        Discover restaurants near you and get food delivered in minutes.
                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    </>
                )}

            </AnimatePresence>
        </>
    );
}

export default Navbar;
