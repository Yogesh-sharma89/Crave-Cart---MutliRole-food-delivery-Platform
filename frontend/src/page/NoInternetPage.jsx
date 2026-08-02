import { motion } from "framer-motion";
import {
    WifiOff,
    RefreshCw,
    CloudOff,
    AlertCircle,
} from "lucide-react";
import { useEffect } from "react";

const NoInternetPage = () => {

    const handleRetry = ()=>{
        window.location.reload();
    }

    useEffect(()=>{
        window.addEventListener("online",handleRetry);

        return ()=>{
            window.removeEventListener("online",handleRetry)
        }
    },[])

    return (
        <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white flex items-center justify-center px-6">

            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

                <motion.div
                    animate={{
                        x: [0, 40, -20, 0],
                        y: [0, -20, 25, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 left-20 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -30, 30, 0],
                        y: [0, 40, -30, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-20 right-20 h-44 w-44 rounded-full bg-orange-400/10 blur-3xl"
                />
            </div>

            <div className="relative z-10 w-full max-w-xl">

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl"
                >

                    {/* Logo */}
                    <div className="flex justify-center mb-8">

                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 rounded-full bg-orange-500 blur-2xl opacity-40" />

                            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-orange-600 shadow-2xl">

                                <WifiOff
                                    size={46}
                                    className="text-white"
                                />

                            </div>

                        </motion.div>

                    </div>

                    {/* Status */}
                    <div className="flex justify-center mb-6">

                        <div className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">

                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [1, .4, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.6,
                                }}
                                className="h-2 w-2 rounded-full bg-orange-400"
                            />

                            <span className="text-sm text-orange-300 font-medium">
                                Connection Lost
                            </span>

                        </div>

                    </div>

                    {/* Heading */}

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .2 }}
                        className="text-center text-4xl font-bold"
                    >
                        You're Offline
                    </motion.h1>

                    <p className="mt-4 text-center text-neutral-400 leading-7">
                        We couldn't reach our servers.
                        Check your internet connection and try again.
                        Once you're back online, everything will continue normally.
                    </p>

                    {/* Info */}

                    <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">

                        <div className="flex items-start gap-3">

                            <CloudOff
                                className="mt-1 text-orange-400"
                                size={22}
                            />

                            <div>

                                <h3 className="font-semibold">
                                    What happened?
                                </h3>

                                <p className="mt-2 text-sm text-neutral-400">
                                    Your device cannot communicate with our servers right now.
                                    This usually happens when your internet connection is unavailable.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: .97 }}
                            onClick={handleRetry}
                            className="flex-1 cursor-pointer flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 py-3 font-semibold shadow-xl transition-all"
                        >
                            <RefreshCw size={18} />
                            Retry Connection
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: .97 }}
                            onClick={() => window.location.href = "/user"}
                            className="flex-1 cursor-pointer rounded-xl border border-white/10 bg-white/5 py-3 font-medium hover:bg-white/10"
                        >
                            Go Home
                        </motion.button>

                    </div>

                    {/* Footer */}

                    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-neutral-500">

                        <AlertCircle size={16} />

                        <span>
                            We'll reconnect automatically when your network returns.
                        </span>

                    </div>

                </motion.div>

            </div>

        </div>
    );
};

export default NoInternetPage;