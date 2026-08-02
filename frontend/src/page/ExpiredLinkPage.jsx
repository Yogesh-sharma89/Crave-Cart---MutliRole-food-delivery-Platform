import { motion } from "framer-motion";
import { Clock3, RefreshCcw, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";

export default function ExpiredLinkPage() {

    const [searchParams] = useSearchParams();
    const reason = searchParams.get("reason");

    const isAuthorizedToView = reason === "invalid_token" || reason === "loader_error";


    if (!isAuthorizedToView) {
        return <Navigate to={'/login'} replace />
    }


    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-bg px-6">

            {/* Floating Background */}
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-light blur-3xl opacity-60"
            />

            <motion.div
                animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary-light blur-3xl opacity-60"
            />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative w-full max-w-lg rounded-3xl border border-border-main bg-white p-10 shadow-[0_25px_60px_rgba(15,23,42,.08)]"
            >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-warning-light">
                    <Clock3
                        size={44}
                        className="text-warning"
                    />
                </div>

                <h1 className="mt-8 text-center text-3xl font-bold text-(--color-text-main)">
                    Reset Link Expired
                </h1>

                <p className="mt-4 text-center leading-7 text-text-muted">
                    This password reset link has expired or has already been used.
                    For your security, reset links remain valid for only <strong>30 minutes</strong>.
                </p>

                <div className="mt-8 rounded-2xl bg-primary-light p-5">
                    <div className="flex gap-3">
                        <span className="text-xl">🔒</span>

                        <div>
                            <h3 className="font-semibold text-(--color-text-main)">
                                Security Notice
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-text-muted">
                                Every password reset link is single-use. If you still need
                                access, request a new reset link below.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                        to="/forgot-password"
                        className="flex max-md:p-2.5 md:h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-(--color-primary) font-semibold text-white transition hover:bg-primary-hover"
                    >
                        <RefreshCcw size={18} />
                        Request New Link
                    </Link>

                    <Link
                        to="/login"
                        className="flex max-md:p-2.5 md:h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-border-main bg-white font-semibold text-(--color-text-main) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                    >
                        <ArrowLeft size={18} />
                        Back to Login
                    </Link>
                </div>

                <p className="mt-8 text-center text-sm text-text-muted">
                    CraveCart • Fast. Fresh. Delivered.
                </p>
            </motion.div>
        </div>
    );
}