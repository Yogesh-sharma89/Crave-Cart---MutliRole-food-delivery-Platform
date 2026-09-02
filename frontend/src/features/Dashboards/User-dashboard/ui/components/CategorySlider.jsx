import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiChevronLeft,
    FiChevronRight,
    FiArrowRight,
} from "react-icons/fi";

const CategorySlider = ({
    categories = [],
    selectedCategory = null,
    onCategorySelect,
}) => {

    const sliderRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);


    // --------------------------------------------------
    // Check slider position
    // --------------------------------------------------

    const updateScrollState = () => {

        const slider = sliderRef.current;

        if (!slider) return;

        const { scrollLeft, scrollWidth, clientWidth } = slider;

        setCanScrollLeft(scrollLeft > 5);

        setCanScrollRight(
            scrollLeft + clientWidth < scrollWidth - 5
        );
    };

    // --------------------------------------------------
    // Scroll slider
    // --------------------------------------------------

    const scrollSlider = (direction) => {

        const slider = sliderRef.current;

        if (!slider) return;

        const scrollAmount = slider.clientWidth * 0.75;

        slider.scrollBy({
            left:
                direction === "left"
                    ? -scrollAmount
                    : scrollAmount,
            behavior: "smooth",
        });

        // Update after smooth scrolling
        setTimeout(updateScrollState, 350);
    };

    // --------------------------------------------------
    // Category selection
    // --------------------------------------------------

    const handleCategoryClick = (category) => {

        onCategorySelect?.(category);
    };

    return (
        <section className="relative w-full">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-5 flex items-end justify-between gap-4">

                <div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="flex items-center gap-2">

                            <span className="text-xl">
                                🍽️
                            </span>

                            <h2 className="
                                text-xl
                                font-extrabold
                                tracking-tight
                                text-[#231C12]
                                sm:text-2xl
                            ">
                                Explore Categories
                            </h2>

                        </div>

                        <p className="
                            mt-1
                            text-sm
                            text-[#8A7C68]
                        ">
                            Find something delicious to satisfy your craving
                        </p>
                    </motion.div>

                </div>


                {/* =================================================
                    DESKTOP CONTROLS
                ================================================= */}

                <div className="hidden items-center gap-2 sm:flex">

                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        onClick={() => scrollSlider("left")}
                        disabled={!canScrollLeft || categories.length===0}
                        aria-label="Previous categories"
                        className="
                            flex
                            size-10
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#1F1A12]/10
                            bg-white
                            text-[#231C12]
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-[#B8823B]/40
                            hover:bg-[#F7F1E6]
                            hover:text-[#B8823B]
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                        "
                    >
                        <FiChevronLeft size={20} />
                    </motion.button>


                    <motion.button
                        type="button"
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        onClick={() => scrollSlider("right")}
                        disabled={!canScrollRight || categories.length===0}
                        aria-label="Next categories"
                        className="
                            flex
                            size-10
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#1F1A12]/10
                            bg-white
                            text-[#231C12]
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-[#B8823B]/40
                            hover:bg-[#F7F1E6]
                            hover:text-[#B8823B]
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                        "
                    >
                        <FiChevronRight size={20} />
                    </motion.button>

                </div>

            </div>


            {/* =====================================================
                SLIDER
            ===================================================== */}

            <div className="relative">

                {/* LEFT FADE */}

                <AnimatePresence>

                    {canScrollLeft && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            className="
                                pointer-events-none
                                absolute
                                left-0
                                top-0
                                z-10
                                h-full
                                w-12
                                bg-linear-to-r
                                from-[#FBF7F0]
                                to-transparent
                            "
                        />
                    )}

                </AnimatePresence>


                {/* RIGHT FADE */}

                {canScrollRight && (
                    <div className="
                        pointer-events-none
                        absolute
                        right-0
                        top-0
                        z-10
                        h-full
                        w-16
                        bg-linear-to-l
                        from-[#FBF7F0]
                        to-transparent
                    " />
                )}


                {/* =================================================
                    SCROLL CONTAINER
                ================================================= */}

                <div
                    ref={sliderRef}
                    onScroll={updateScrollState}
                    className="
                        flex
                        gap-3
                        overflow-x-auto
                        scroll-smooth
                        px-1
                        py-3
                        scrollbar-none
                        [&::-webkit-scrollbar]:hidden
                    "
                >

                    {categories.map((category, index) => {

                        const isSelected =
                            selectedCategory === category._id;

                        return (
                            <motion.button
                                key={category._id}
                                type="button"

                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.35,
                                    delay: Math.min(
                                        index * 0.04,
                                        0.4
                                    ),
                                }}

                                whileHover={{
                                    y: -6,
                                }}

                                whileTap={{
                                    scale: 0.95,
                                }}

                                onClick={() =>
                                    handleCategoryClick(category)
                                }

                                className={`
                                    group
                                    relative
                                    flex
                                    min-w-30
                                    shrink-0
                                    cursor-pointer
                                    flex-col
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    px-4
                                    py-5
                                    transition-all
                                    duration-300
                                    sm:min-w-34

                                    ${
                                        isSelected
                                            ? `
                                                border-[#B8823B]
                                                bg-linear-to-br
                                                from-[#B8823B]
                                                to-[#96652A]
                                                shadow-xl
                                                shadow-[#B8823B]/20
                                            `
                                            : `
                                                border-[#1F1A12]/8
                                                bg-white
                                                shadow-[0_8px_25px_rgba(31,26,18,0.06)]
                                                hover:border-[#B8823B]/35
                                                hover:shadow-[0_15px_35px_rgba(31,26,18,0.10)]
                                            `
                                    }
                                `}
                            >

                                {/* =================================
                                    Background Glow
                                ================================= */}

                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        -right-6
                                        -top-6
                                        size-20
                                        rounded-full
                                        blur-2xl
                                        transition
                                        duration-300

                                        ${
                                            isSelected
                                                ? "bg-white/15"
                                                : "bg-[#B8823B]/0 group-hover:bg-[#B8823B]/10"
                                        }
                                    `}
                                />


                                {/* =================================
                                    ICON
                                ================================= */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.12,
                                        rotate: [-3, 3, -3, 0],
                                    }}

                                    transition={{
                                        duration: 0.4,
                                    }}

                                    className={`
                                        relative
                                        flex
                                        size-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        text-4xl
                                        transition-all
                                        duration-300

                                        ${
                                            isSelected
                                                ? "bg-white/15 shadow-inner"
                                                : "bg-[#F7F1E6] group-hover:bg-[#B8823B]/10"
                                        }
                                    `}
                                >
                                    {category.icon}
                                </motion.div>


                                {/* =================================
                                    CATEGORY NAME
                                ================================= */}

                                <span
                                    className={`
                                        relative
                                        mt-3
                                        text-sm
                                        font-bold
                                        whitespace-nowrap
                                        transition-colors
                                        duration-300

                                        ${
                                            isSelected
                                                ? "text-white"
                                                : "text-[#231C12]"
                                        }
                                    `}
                                >
                                    {category.name}
                                </span>


                                {/* =================================
                                    TYPE
                                ================================= */}

                                <span
                                    className={`
                                        relative
                                        mt-1
                                        text-2xs
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        transition-colors
                                        duration-300

                                        ${
                                            isSelected
                                                ? "text-white/70"
                                                : "text-[#A99A82]"
                                        }
                                    `}
                                >
                                    {category.type}
                                </span>


                                {/* =================================
                                    ACTIVE INDICATOR
                                ================================= */}

                                <AnimatePresence>

                                    {isSelected && (
                                        <motion.div
                                            initial={{
                                                width: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                width: 24,
                                                opacity: 1,
                                            }}
                                            exit={{
                                                width: 0,
                                                opacity: 0,
                                            }}
                                            className="
                                                absolute
                                                bottom-2
                                                h-1
                                                rounded-full
                                                bg-white
                                            "
                                        />
                                    )}

                                </AnimatePresence>

                            </motion.button>
                        );
                    })}

                </div>

            </div>


            {/* =====================================================
                MOBILE SCROLL HINT
            ===================================================== */}

            {categories.length > 4 && (
                <div className="
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-[11px]
                    font-medium
                    text-[#A99A82]
                    sm:hidden
                ">
                    <span>
                        Swipe to explore
                    </span>

                    <motion.span
                        animate={{
                            x: [0, 4, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        <FiArrowRight size={13} />
                    </motion.span>
                </div>
            )}

        </section>
    );
};

export default CategorySlider;