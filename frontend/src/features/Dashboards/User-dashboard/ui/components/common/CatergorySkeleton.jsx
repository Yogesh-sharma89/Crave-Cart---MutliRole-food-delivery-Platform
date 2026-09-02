const CategorySkeleton = ({ count = 6 }) => {
    return (
        <section className="relative w-full">
            {/* Header Skeleton */}
            <div className="mb-5 flex items-end justify-between gap-4">
                <div className="space-y-2">
                    {/* Title */}
                    <div className="h-7 w-52 animate-pulse rounded-lg bg-[#E8DFD2] sm:h-8 sm:w-64" />

                    {/* Subtitle */}
                    <div className="h-4 w-64 animate-pulse rounded-md bg-[#EEE7DC] sm:w-80" />
                </div>

                {/* Desktop arrows */}
                <div className="hidden items-center gap-2 sm:flex">
                    <div className="size-10 animate-pulse rounded-xl bg-[#E8DFD2]" />
                    <div className="size-10 animate-pulse rounded-xl bg-[#E8DFD2]" />
                </div>
            </div>

            {/* Category Cards */}
            <div className="flex gap-3 overflow-hidden px-1 py-3">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="
                            flex min-w-30 shrink-0 animate-pulse
                            flex-col items-center justify-center
                            rounded-3xl border border-[#1F1A12]/5
                            bg-white px-4 py-5
                            shadow-[0_8px_25px_rgba(31,26,18,0.05)]
                            sm:min-w-34
                        "
                    >
                        {/* Icon */}
                        <div className="size-16 rounded-2xl bg-[#E8DFD2]" />

                        {/* Category name */}
                        <div className="mt-3 h-4 w-16 rounded-md bg-[#E8DFD2]" />

                        {/* Category type */}
                        <div className="mt-2 h-2.5 w-10 rounded-md bg-[#EEE7DC]" />
                    </div>
                ))}
            </div>

            {/* Mobile swipe hint skeleton */}
            <div className="mt-2 flex items-center justify-center">
                <div className="h-3 w-28 animate-pulse rounded-md bg-[#E8DFD2] sm:hidden" />
            </div>
        </section>
    );
};

export default CategorySkeleton;