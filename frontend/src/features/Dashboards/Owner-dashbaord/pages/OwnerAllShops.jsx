import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";

import ShopSkeleton from "../components/ShopSkeleton"
import ShopCard from "../components/ShopCard"
import useShopStore from "../../../../store/shop.store";
import useGetShops from "../hooks/useGetShops";
import ShopEmptyState from "../components/ShopEmptyState"

// TODO: replace with real data from your shop store / API
const mockShops = [
    {
        id: "1",
        name: "Pizza Palace",
        emoji: "🍕",
        status: "active",
        image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
        area: "Connaught Place",
        city: "New Delhi",
        state: "Delhi",
        address: "H-24 Block A, Main Market",
        country: "India",
        pincode: "110001",
    },
    {
        id: "2",
        name: "Coffee House",
        emoji: "☕",
        status: "active",
        image:
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        area: "Sector 18",
        city: "Noida",
        state: "Uttar Pradesh",
        address: "Shop 12, Atta Market",
        country: "India",
        pincode: "201301",
    },
    {
        id: "3",
        name: "Burger Express",
        emoji: "🍔",
        status: "inactive",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
        area: "MG Road",
        city: "Gurugram",
        state: "Haryana",
        address: "Plot 7, Cyber Hub Lane",
        country: "India",
        pincode: "122002",
    },
];

const OwnerAllShops = () => {
    const navigate = useNavigate();

    const { isLoading } = useGetShops();
    const {shops} = useShopStore();

    return (

        <div className="mx-auto w-full max-w-6xl">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            >
                <div>
                    <h1 className="text-2xl font-bold text-[#231C12] sm:text-3xl">
                        My Shops
                    </h1>
                    <p className="mt-1 text-sm text-[#8A7C68]">
                        {shops.length
                            ? `Manage your ${shops.length} restaurant${shops.length > 1 ? "s" : ""
                            } from one place.`
                            : "Manage all your restaurants from one place."}
                    </p>
                </div>

                {shops.length > 0 && (
                    <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/owner/shops/new")}
                        className="flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#B8823B]/25"
                    >
                        <FiPlus size={17} />
                        Create New Shop
                    </motion.button>
                )}
            </motion.div>

            {/* Grid or empty state */}
            {shops.length > 0 ? (

                isLoading ?
                    (
                        <ShopSkeleton />

                    )
                    :
                    (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                            {shops?.map((shop, i) => (
                                <ShopCard key={shop._id} shop={shop} index={i} />
                            ))}
                        </div>
                    )

            ) : (
                < ShopEmptyState/>
            )}
        </div>

    );
};


export default OwnerAllShops;
