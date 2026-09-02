import { motion } from "framer-motion";

const ProfileAvatarSkeleton = () => {
  return (
    <div className="relative inline-flex items-center justify-center">
      
      {/* Main Avatar Skeleton */}
      <motion.div
        className="
          relative
          h-28 w-28
          sm:h-32 sm:w-32
          md:h-36 md:w-36
          lg:h-40 lg:w-40
          rounded-full
          overflow-hidden
          border-[5px] border-white
          bg-neutral-200
          shadow-lg
        "
        animate={{
          opacity: [0.65, 1, 0.65],
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Shimmer */}
        <motion.div
          className="
            absolute inset-0
            bg-linear-to-r
            from-transparent
            via-white/60
            to-transparent
          "
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.3,
          }}
        />
      </motion.div>


      {/* Google / Provider Badge Skeleton */}
      <motion.div
        className="
          absolute
          -top-1 -left-1
          flex items-center justify-center
          h-10 w-10
          sm:h-11 sm:w-11
          rounded-full
          border-2 border-white
          bg-neutral-300
          shadow-md
        "
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="h-4 w-4 rounded-full bg-neutral-200"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
        />
      </motion.div>


      {/* Verification Badge Skeleton */}
      <motion.div
        className="
          absolute
          -bottom-1 -right-1
          flex items-center justify-center
          h-11 w-11
          sm:h-12 sm:w-12
          rounded-full
          border-[5px] border-white
          bg-neutral-200
          shadow-md
        "
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="h-5 w-5 rounded-md border-[3px] border-neutral-300" />
      </motion.div>

    </div>
  );
};

export default ProfileAvatarSkeleton;