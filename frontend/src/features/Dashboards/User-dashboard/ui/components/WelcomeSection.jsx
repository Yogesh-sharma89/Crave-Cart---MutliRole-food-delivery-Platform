import { motion } from "framer-motion";
import {
    FiArrowRight,
    FiMapPin,
    FiClock,
    FiChevronRight,
} from "react-icons/fi";
import getGreeting from "../../../../../utils/getGreeting";



const WelcomeSection = ({
    userName = "there",
    location,
    onExplore,
}) => {

    const greeting = getGreeting();

    return (
        <section className="
            relative
            overflow-hidden
            rounded-4xl
            border
            select-none
            border-[#1F1A12]/8
            bg-white
            shadow-[0_20px_60px_rgba(31,26,18,0.08)]
        ">

            {/* ───────────────── Background Decoration ───────────────── */}

            <div className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                size-72
                rounded-full
                bg-[#B8823B]/10
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                -bottom-24
                left-1/3
                size-64
                rounded-full
                bg-[#96652A]/5
                blur-3xl
            " />

            {/* Decorative circles */}
            <div className="
                pointer-events-none
                absolute
                right-20
                top-10
                size-3
                rounded-full
                bg-[#B8823B]/30
            " />

            <div className="
                pointer-events-none
                absolute
                right-32
                top-24
                size-2
                rounded-full
                bg-[#96652A]/30
            " />

            {/* ───────────────── Main Content ───────────────── */}

            <div className="
                relative
                z-10
                flex
                min-h-70
                flex-col
                justify-between
                gap-8
                px-6
                py-8
                sm:px-8
                sm:py-10
                lg:flex-row
                lg:items-center
                lg:px-12
            ">

                {/* Left Content */}

                <div className="max-w-2xl">

                    {/* Location */}

                    {location && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="
                                mb-5
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-[#1F1A12]/8
                                bg-[#F7F1E6]
                                px-3
                                py-2
                                text-xs
                                text-[#8A7C68]
                            "
                        >
                            <FiMapPin
                                size={14}
                                className="text-[#B8823B]"
                            />

                            <span>
                                Delivering to
                            </span>

                            <span className="font-semibold text-[#231C12]">
                                {location}
                            </span>

                            <FiChevronRight
                                size={13}
                                className="text-[#B8823B]"
                            />
                        </motion.div>
                    )}

                    {/* Greeting */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="flex items-center gap-3"
                    >

                        <span className="text-3xl sm:text-4xl">
                            {greeting.emoji}
                        </span>

                        <p className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-[#B8823B]
                        ">
                            {greeting.title}
                        </p>

                    </motion.div>

                    {/* Main Heading */}

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.55,
                            delay: 0.08,
                        }}
                        className="
                            mt-2
                            text-3xl
                            font-extrabold
                            tracking-tight
                            text-[#231C12]
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Hey,{" "}

                        <span className="text-[#B8823B]">
                            {userName}
                        </span>
                        !

                        <br className="hidden sm:block" />

                        <span className="text-[#231C12]">
                            {" "}What are you craving?
                        </span>
                    </motion.h1>

                    {/* Subtitle */}

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.16,
                        }}
                        className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-6
                            text-[#8A7C68]
                            sm:text-base
                            sm:leading-7
                        "
                    >
                        {greeting.subtitle}
                    </motion.p>

                    {/* Quick info */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.24,
                        }}
                        className="
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            gap-x-5
                            gap-y-2
                            text-xs
                            font-medium
                            text-[#8A7C68]
                        "
                    >

                        <span className="flex items-center gap-1.5">
                            <FiClock
                                size={14}
                                className="text-[#B8823B]"
                            />
                            Fast delivery
                        </span>

                        <span className="flex items-center gap-1.5">
                            <span className="text-[#B8823B]">
                                ★
                            </span>
                            Fresh & delicious
                        </span>

                    </motion.div>

                </div>

                {/* ───────────────── CTA Area ───────────────── */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 25,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                    }}
                    className="
                        relative
                        flex
                        shrink-0
                        items-center
                        lg:pr-6
                    "
                >

                    {/* Food emoji decoration */}

                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 3, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            -right-1
                            -top-8
                            hidden
                            text-5xl
                            drop-shadow-md
                            sm:block
                        "
                    >
                        🍕
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 7, 0],
                            rotate: [0, -3, 0],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            -bottom-7
                            -left-8
                            hidden
                            text-4xl
                            sm:block
                        "
                    >
                        🍔
                    </motion.div>

                    {/* CTA Card */}

                    <motion.button
                        whileHover={{
                            scale: 1.04,
                            y: -3,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        onClick={onExplore}
                        className="
                            group
                            relative
                            flex
                            cursor-pointer
                            items-center
                            gap-4
                            rounded-3xl
                            bg-linear-to-br
                            from-[#B8823B]
                            to-[#96652A]
                            px-6
                            py-5
                            text-left
                            text-white
                            shadow-xl
                            shadow-[#B8823B]/25
                        "
                    >

                        <div className="
                            flex
                            size-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white/15
                            text-2xl
                        ">
                            🍽️
                        </div>

                        <div>
                            <p className="
                                text-xs
                                font-medium
                                text-white/75
                            ">
                                Feeling hungry?
                            </p>

                            <p className="
                                mt-0.5
                                font-bold
                            ">
                                Explore Food
                            </p>
                        </div>

                        <motion.div
                            animate={{
                                x: [0, 4, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                            className="
                                ml-1
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-full
                                bg-white/15
                            "
                        >
                            <FiArrowRight size={18} />
                        </motion.div>

                    </motion.button>

                </motion.div>

            </div>

            {/* Bottom accent */}

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.3,
                }}
                className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-full
                    origin-left
                    bg-linear-to-r
                    from-[#B8823B]
                    via-[#96652A]
                    to-transparent
                "
            />

        </section>
    );
};

export default WelcomeSection;