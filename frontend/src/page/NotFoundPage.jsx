import { motion } from "framer-motion";
import { Home, ArrowLeft, SearchX, SearchXIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-bg px-6 py-12">

            {/* Background Blob 1 */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                }}
                className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-light blur-3xl opacity-60"
            />

            {/* Background Blob 2 */}
            <motion.div
                animate={{
                    x: [0, -25, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                }}
                className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary-light blur-3xl opacity-60"
            />

            {/* Floating Emojis */}
            <motion.span
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute left-[15%] top-[18%] text-4xl opacity-20"
            >
                🍔
            </motion.span>

            <motion.span
                animate={{ y: [0, 18, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute right-[18%] top-[22%] text-5xl opacity-20"
            >
                🍕
            </motion.span>

            <motion.span
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute bottom-[18%] left-[20%] text-4xl opacity-20"
            >
                🥤
            </motion.span>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="relative w-full max-w-xl rounded-3xl border border-border-main bg-(--color-surface) p-10 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
            >
                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-light">
                    <SearchXIcon
                        size={42}
                        className="text-(--color-primary)"
                    />
                </div>

                {/* 404 */}
                <h1 className="mt-8 text-center text-7xl font-extrabold tracking-tight text-(--color-primary)">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-3 text-center text-3xl font-bold text-(--color-text-main)">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-md text-center leading-8 text-text-muted">
                    Looks like the page you're searching for doesn't exist,
                    may have been moved, or the link is no longer available.
                </p>

                {/* Tip Box */}
                <div className="mt-8 rounded-2xl border border-[#FFE4A3] bg-secondary-light p-5">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>

                        <div>
                            <h3 className="font-semibold text-(--color-text-main)">
                                Quick Tip
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-text-muted">
                                Double-check the URL or head back to a known page to continue
                                exploring CraveCart.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                        to="/user"
                        className="flex py-3 px-5 flex-1 items-center justify-center gap-2 rounded-xl bg-(--color-primary) font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="flex  py-3 px-5 flex-1 items-center justify-center gap-2 rounded-xl border border-border-main bg-white font-semibold text-(--color-text-main) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-primary) hover:text-(--color-primary)"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-10 border-t border-border-subtle pt-6 text-center">
                    <h4 className="font-bold text-(--color-text-main)">
                        CraveCart
                    </h4>

                    <p className="mt-2 text-sm text-text-muted">
                        Fast. Fresh. Delivered.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}