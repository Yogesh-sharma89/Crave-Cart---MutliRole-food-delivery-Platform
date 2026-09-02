import { useEffect, useRef, useState } from "react";
import {
    FiMenu,
    FiX,
    FiPackage,
    FiUser,
    FiSearch,
    FiChevronDown,
    FiPlus,
    FiArrowRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import ProfileMenu from "./ProfileMenu";
import useGetShops from "../hooks/useGetShops";



const OwnerNavbar = () => {
 
    const [mobileOpen, setMobileOpen] = useState(false);

    const {data:shops} = useGetShops();
    const [showProfile, setShowProfile] = useState(false);

    const [shopMenuOpen, setShopMenuOpen] = useState(false);

    const [shopSearch, setShopSearch] = useState("");
    const [activeShop, setActiveShop] = useState(shops?.[0]);

    const navigate = useNavigate();

    const shopMenuRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileOpen]);

    // close the shop dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (shopMenuRef.current && !shopMenuRef.current.contains(e.target)) {
                setShopMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const filteredShops = shops?.filter((s) =>
        s.shopName?.toLowerCase().includes(shopSearch.toLowerCase())
    );

    const handleSelectShop = (shop) => {
        setActiveShop(shop);
        setShopMenuOpen(false);
        setShopSearch("");
        navigate(`/owner/shops/${shop?._id}`)
    };

    return (
        <>


            <header
                className="sticky left-0  top-0 w-full  pt-4  px-4  z-50 overflow-visible "
            >
                <motion.div className="mx-auto max-w-7xl w-[94%]"
                    initial={{ transform: "translateY(-40px)", opacity: 0 }}
                    animate={{ transform: "translateY(0px)", opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <nav className="flex  select-none h-20 max-sm:h-16 rounded-full bg-white/85 shadow-[0_20px_60px_rgba(31,26,18,0.12)] ring-1 ring-[#1F1A12]/6 backdrop-blur-2xl items-center justify-between gap-4 px-4 lg:px-8">
                        {/* Brand */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center max-md:gap-2 gap-3 cursor-pointer"
                            onClick={() => navigate("/owner")}
                        >
                            <div className="flex size-12 max-md:size-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#B8823B] to-[#96652A] shadow-lg shadow-[#B8823B]/30">
                                🍔
                            </div>

                            <div>
                                <h1 className="max-md:text-lg text-xl font-bold text-[#231C12]">
                                    CraveCart
                                </h1>
                                <p className="text-xs text-[#8A7C68]">
                                    Owner Dashboard
                                </p>
                            </div>

                        </motion.div>

                        {/* Desktop */}
                        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
                            {/* My Shops dropdown */}
                            <div className="relative" ref={shopMenuRef}>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShopMenuOpen((v) => !v)}
                                    className="flex cursor-pointer items-center gap-2 rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] px-4 py-3 transition hover:border-[#B8823B]/50"
                                >
                                    <span className="text-lg leading-none">
                                        {activeShop?.emoji}
                                    </span>

                                    <div className="text-left leading-tight">
                                        <p className="text-[11px] text-[#8A7C68]">
                                            My Shop
                                        </p>
                                        <span className="max-w-[16ch] truncate whitespace-nowrap text-sm font-semibold text-[#231C12] block">
                                            {activeShop?.name}
                                        </span>
                                    </div>

                                    <motion.span
                                        animate={{ rotate: shopMenuOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-[#8A7C68]"
                                    >
                                        <FiChevronDown size={16} />
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence>
                                    {shopMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                            transition={{ duration: 0.16, ease: "easeOut" }}
                                            className="absolute left-0 top-[calc(100%+10px)] w-80 origin-top-left overflow-hidden rounded-2xl border border-[#1F1A12]/10 bg-white shadow-[0_20px_60px_rgba(31,26,18,0.18)]"
                                        >
                                            {/* Search */}
                                            <div className="border-b border-[#1F1A12]/8 p-3">
                                                <div className="relative">
                                                    <FiSearch
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A99A82]"
                                                        size={16}
                                                    />
                                                    <input
                                                        autoFocus
                                                        value={shopSearch}
                                                        onChange={(e) => setShopSearch(e.target.value)}
                                                        type="text"
                                                        placeholder="Search shop..."
                                                        className="h-10 w-full rounded-xl border border-[#1F1A12]/10 bg-[#F7F1E6] pl-9 pr-3 text-sm text-[#231C12] outline-none transition placeholder:text-[#A99A82] focus:border-[#B8823B]/60 focus:bg-white focus:ring-4 focus:ring-[#B8823B]/15"
                                                    />
                                                </div>
                                            </div>

                                            {/* Shop list */}
                                            <div className="max-h-64 overflow-y-auto p-2">
                                                {filteredShops.length ? (
                                                    filteredShops.map((shop, i) => (
                                                        <motion.button
                                                            key={shop.id}
                                                            initial={{ opacity: 0, x: -6 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.03 }}
                                                            whileHover={{ x: 3 }}
                                                            onClick={() => handleSelectShop(shop)}
                                                            className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${activeShop?.id === shop.id
                                                                ? "bg-[#B8823B]/10 mb-2.5"
                                                                : "hover:bg-[#F7F1E6]"
                                                                }`}
                                                        >
                                                            <span className="text-xl leading-none">
                                                                {shop?.emoji}
                                                            </span>
                                                            <span className="flex-1 truncate text-sm font-medium text-[#231C12]">
                                                                {shop.shopName}
                                                            </span>
                                                            <FiArrowRight
                                                                className="text-[#B8823B] opacity-0 transition group-hover:opacity-100"
                                                                size={16}
                                                            />
                                                        </motion.button>
                                                    ))
                                                ) : (
                                                    <p className="px-3 py-6 text-center text-sm text-[#8A7C68]">
                                                        No shop found.
                                                    </p>
                                                )}
                                            </div>

                                            {/* Create new */}
                                            <div className="border-t border-[#1F1A12]/8 p-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setShopMenuOpen(false);
                                                        navigate("/owner/shops/new");
                                                    }}
                                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#B8823B]/25"
                                                >
                                                    <FiPlus size={16} />
                                                    Create New Shop
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Orders */}
                            <motion.button
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/owner/orders")}
                                className="flex cursor-pointer w-auto h-12 items-center gap-2 rounded-2xl border border-[#1F1A12]/10 bg-[#F7F1E6] px-4 font-medium text-[#231C12] transition hover:border-[#B8823B]/50 hover:bg-[#B8823B]/10"
                            >
                                <FiPackage size={18} />
                                <span className="text-xs">Orders</span>
                            </motion.button>
                        </div>

                        {/* Right side: profile + mobile trigger */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowProfile(!showProfile)}
                                    whileHover={{ scale: 1.06 }}
                                    className="flex relative max-md:p-2.5 lg:p-3 cursor-pointer items-center justify-center rounded-full border border-[#B8823B]/40 bg-linear-to-br from-[#B8823B] to-[#96652A] shadow-lg shadow-[#B8823B]/25"
                                >
                                    <FiUser className="text-white" size={20} />
                                </motion.button>

                                {showProfile && (
                                    <div className="absolute rounded-lg shadow-2xl w-auto h-20 -bottom-26 -left-60">
                                        <ProfileMenu />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setMobileOpen(true)}
                                className="rounded-xl border cursor-pointer border-[#1F1A12]/10 bg-[#F7F1E6] p-2 text-[#231C12] lg:hidden"
                            >
                                <FiMenu className="size-6" />
                            </button>
                        </div>
                    </nav>
                </motion.div>
            </header>


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
                            transition={{ duration: 0.35 }}
                            className="fixed right-0 top-0 z-9999 flex h-screen w-85 max-w-[92vw] flex-col bg-[#FBF7F0] shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-[#1F1A12]/10 p-5">
                                <div
                                    className="flex cursor-pointer items-center gap-3"
                                    onClick={() => navigate("/owner")}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#B8823B] to-[#96652A]">
                                        🍔
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-[#231C12]">
                                            CraveCart
                                        </h2>
                                        <p className="text-xs text-[#8A7C68]">
                                            Owner Dashboard
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
                                {/* My Shops (mobile, inline accordion-style) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 }}
                                    className="overflow-hidden rounded-2xl border border-[#1F1A12]/10 bg-white"
                                >
                                    <button
                                        onClick={() => setShopMenuOpen((v) => !v)}
                                        className="flex w-full cursor-pointer items-center gap-3 p-4"
                                    >
                                        <span className="text-xl leading-none">
                                            {activeShop?.emoji}
                                        </span>

                                        <div className="flex-1 text-left leading-tight">
                                            <p className="text-[11px] text-[#8A7C68]">
                                                My Shop
                                            </p>
                                            <span className="text-sm font-semibold text-[#231C12]">
                                                {activeShop?.name}
                                            </span>
                                        </div>

                                        <motion.span
                                            animate={{ rotate: shopMenuOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-[#8A7C68]"
                                        >
                                            <FiChevronDown size={18} />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence>
                                        {shopMenuOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="border-t border-[#1F1A12]/8"
                                            >
                                                <div className="p-3">
                                                    <div className="relative mb-2">
                                                        <FiSearch
                                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A99A82]"
                                                            size={16}
                                                        />
                                                        <input
                                                            value={shopSearch}
                                                            onChange={(e) =>
                                                                setShopSearch(e.target.value)
                                                            }
                                                            type="text"
                                                            placeholder="Search shop..."
                                                            className="h-10 w-full rounded-xl border border-[#1F1A12]/10 bg-[#F7F1E6] pl-9 pr-3 text-sm text-[#231C12] outline-none focus:border-[#B8823B]/60"
                                                        />
                                                    </div>

                                                    <div className="max-h-56 space-y-1 overflow-y-auto">
                                                        {filteredShops.length ? (
                                                            filteredShops.map((shop) => (
                                                                <button
                                                                    key={shop.id}
                                                                    onClick={() =>
                                                                        handleSelectShop(shop)
                                                                    }
                                                                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${activeShop?.id === shop.id
                                                                        ? "bg-[#B8823B]/10"
                                                                        : "hover:bg-[#F7F1E6]"
                                                                        }`}
                                                                >
                                                                    <span className="text-lg leading-none">
                                                                        {shop.emoji}
                                                                    </span>
                                                                    <span className="flex-1 truncate text-sm font-medium text-[#231C12]">
                                                                        {shop.name}
                                                                    </span>
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <p className="px-3 py-4 text-center text-sm text-[#8A7C68]">
                                                                No shop found.
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setShopMenuOpen(false);
                                                            setMobileOpen(false);
                                                            navigate("/owner/shops/new");
                                                        }}
                                                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#B8823B]/25"
                                                    >
                                                        <FiPlus size={16} />
                                                        Create New Shop
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {[
                                    {
                                        title: "Orders",
                                        icon: <FiPackage size={20} />,
                                        onClick: () => {
                                            setMobileOpen(false);
                                            navigate("/owner/orders");
                                        },
                                    },
                                    {
                                        title: "My Profile",
                                        icon: <FiUser size={20} />,
                                        onClick: () => {
                                            setMobileOpen(false);
                                            navigate("/owner/profile");
                                        },
                                    },
                                ].map((item, index) => (
                                    <motion.button
                                        key={item.title}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.12 + index * 0.08 }}
                                        whileHover={{ x: 5 }}
                                        onClick={item.onClick}
                                        className="flex w-full items-center gap-4 rounded-2xl border border-[#1F1A12]/10 cursor-pointer bg-white p-4 text-left text-[#231C12] transition hover:border-[#B8823B]/50 hover:bg-[#B8823B]/10"
                                    >
                                        <div className="text-[#B8823B]">{item.icon}</div>
                                        <span className="font-medium">{item.title}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-auto border-t border-[#1F1A12]/10 p-5">
                                <div className="rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] p-5">
                                    <h3 className="font-semibold text-white">
                                        Running the show
                                    </h3>
                                    <p className="mt-1 text-sm text-white/85">
                                        Switch shops, track orders, and manage your business — all in one place.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default OwnerNavbar;
