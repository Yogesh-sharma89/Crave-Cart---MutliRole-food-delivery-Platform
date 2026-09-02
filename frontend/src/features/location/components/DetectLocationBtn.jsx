import { motion } from "framer-motion";
import { Loader2, Crosshair } from "lucide-react";
import useLocationStore from "../../../store/location.store";



export default function DetectLocationButton() {

    const {loading,getCoordinates} = useLocationStore();
    
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={getCoordinates}
      disabled={loading}
      className="
        group
        relative
        flex
        items-center
        gap-2
        overflow-hidden
        rounded-2xl
        cursor-pointer
        border
        border-orange-200
        bg-white/80
        backdrop-blur-xl
        px-3
        py-2.5
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-400
        hover:shadow-md
        hover:shadow-orange-200/40
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 via-orange-400/10 to-amber-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <motion.div
        animate={loading ? { rotate: 360 } : { scale: [1, 1.08, 1] }}
        transition={
          loading
            ? { duration: 1, repeat: Infinity, ease: "linear" }
            : { duration: 2, repeat: Infinity }
        }
        className="
          relative
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-linear-to-br
          from-orange-500
          to-amber-500
          text-white
          shadow-sm
        "
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Crosshair className="h-3.5 w-3.5" />
        )}
      </motion.div>

      <span className="relative text-sm font-semibold text-slate-900 whitespace-nowrap">
        {loading ? "Detecting..." : "Use Location"}
      </span>
    </motion.button>
  );
}