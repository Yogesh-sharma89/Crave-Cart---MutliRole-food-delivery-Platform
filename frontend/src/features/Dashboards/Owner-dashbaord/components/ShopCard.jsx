import { motion } from "framer-motion";
import { FiMapPin, FiHome, FiGlobe, FiHash, FiExternalLink, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import useShopStore from "../../../../store/shop.store";

const ShopCard = ({ shop, index = 0 }) => {

    const navigate = useNavigate();

    const isActive = !shop.isDeleted === "active";

    const {setCurrentShop,currentShop} = useShopStore();
    

   const handleEdit = ()=>{
      //set current shop to shop and shopId to id 
      console.log("Shop  in shop card : ",shop)
      setCurrentShop(shop);
      navigate(`/owner/shops/${shop._id}/edit`)
   }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-white/85 shadow-[0_12px_40px_rgba(31,26,18,0.10)] ring-1 ring-[#1F1A12]/6 backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(31,26,18,0.18)]"
        >
            {/* Image with gradient overlay */}
            <div className="relative h-48 w-full overflow-hidden sm:h-52">
                <motion.img
                    src={shop.shopImage}
                    alt={shop.shopName}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Gradient overlay so text reads on top of the image */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/5" />

                {/* Status badge */}
                <div className="absolute right-4 top-4">
                    <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${isActive
                                ? "bg-white/20 text-white"
                                : "bg-black/30 text-white/80"
                            }`}
                    >
                        <motion.span
                            animate={
                                isActive
                                    ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }
                                    : {}
                            }
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className={`size-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-gray-300"
                                }`}
                        />
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* Shop name over the image */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white drop-shadow-sm sm:text-xl">
                        <span className="text-xl">{shop.emoji}</span>
                        <span className="truncate">{shop.shopName}</span>
                    </h3>
                </div>
            </div>

            {/* Details */}
            <div className="space-y-3.5 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                    <FiMapPin className="mt-0.5 shrink-0 text-[#B8823B]" size={17} />
                    <div className="min-w-0 leading-tight">
                        <p className="truncate text-sm font-semibold text-[#231C12]">
                            {shop.area}
                        </p>
                        <p className="truncate text-xs text-[#8A7C68]">
                            {shop.city}, {shop.state}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FiHome className="mt-0.5 shrink-0 text-[#B8823B]" size={17} />
                    <p className="truncate text-sm text-[#5B5140]">{shop.address}</p>
                </div>

                <div className="flex items-center gap-4 pt-0.5 text-xs text-[#8A7C68]">
                    <span className="flex items-center gap-1.5">
                        <FiGlobe className="text-[#B8823B]" size={14} />
                        {shop.country}
                    </span>
                    <span className="h-3 w-px bg-[#1F1A12]/10" />
                    <span className="flex items-center gap-1.5">
                        <FiHash className="text-[#B8823B]" size={14} />
                        {shop.pincode}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-[#1F1A12]/8 px-5 py-4 sm:px-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/owner/shops/${shop.id}`)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#B8823B] to-[#96652A] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#B8823B]/25 transition"
                >
                    <FiExternalLink size={15} />
                    <span >Open Shop</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleEdit}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#1F1A12]/12 bg-[#F7F1E6] px-4 py-2.5 text-sm font-semibold text-[#231C12] transition hover:border-[#B8823B]/50 hover:bg-[#B8823B]/10"
                >
                    <FiEdit2 size={15} />
                    Edit Shop
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ShopCard;
