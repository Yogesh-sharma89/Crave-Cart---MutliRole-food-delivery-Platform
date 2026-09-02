import { motion } from "framer-motion";
import { Leaf, Drumstick } from "lucide-react";

const FoodTypeBadge = ({ type }) => {
    
  const isVeg = type === "veg";

  const config = {
    veg: {
      label: "Veg",
      Icon: Leaf,
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    },

    "non-veg": {
      label: "Non-Veg",
      Icon: Drumstick,
      className:
        "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
    },
  };

  const currentType = config[type] ?? config.veg;
  const Icon = currentType.Icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 18,
      }}
      whileHover={{
        scale: 1.05,
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${currentType.className}`}
    >
      <motion.span
        animate={
          isVeg
            ? {
                scale: [1, 1.15, 1],
              }
            : {
                rotate: [0, -8, 8, 0],
              }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <Icon className="size-3.5" strokeWidth={2.2} />
      </motion.span>

      <span>{currentType.label}</span>
    </motion.span>
  );
};

export default FoodTypeBadge;