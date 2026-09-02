import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";

import ShopSkeleton from "../components/ShopSkeleton"
import ShopCard from "../components/ShopCard"
import useShopStore from "../../../../store/shop.store";
import useGetShops from "../hooks/useGetShops";
import ShopEmptyState from "../components/ShopEmptyState"



const OwnerAllShops = () => {
    const navigate = useNavigate();

    const {data:shops,isLoading } = useGetShops();

    if(isLoading){
        return <ShopSkeleton/>
    }

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
                        {shops?.length
                            ? `Manage your ${shops?.length} restaurant${shops?.length > 1 ? "s" : ""
                            } from one place.`
                            : "Manage all your restaurants from one place."}
                    </p>
                </div>

                {shops?.length > 0 && (
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


            {isLoading ?
                (
                    <ShopSkeleton />
                )
                :
                (
                  shops?.length === 0 ? 
                   <ShopEmptyState/>
                   :
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                        {shops?.map((shop, i) => (
                            <ShopCard key={shop._id} shop={shop} index={i} />
                        ))}
                    </div>
                )
            }

        </div>

    );
};


export default OwnerAllShops;
