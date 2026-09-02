import { motion } from "framer-motion";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-stone-200/80 ${className}`}
    />
  );
};

const ItemCardSkeleton = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
      className="
        overflow-hidden
        rounded-[24px]
        border border-stone-200/80
        bg-white
        shadow-[0_8px_30px_rgb(0,0,0,0.06)]
      "
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Status Badge */}
        <div className="absolute left-4 top-4">
          <Skeleton className="h-12 w-40 rounded-full bg-stone-100" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title + Veg Badge */}
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-8 w-44" />

          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Category */}
        <Skeleton className="mt-3 h-5 w-24" />

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between">
          {/* Price */}
          <Skeleton className="h-8 w-20" />

          {/* Rating + Time */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-14" />

            <Skeleton className="h-7 w-12" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCardSkeleton;