import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FullScreenLoader({
  text = "Loading..."
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-app-bg">

      {/* Background Blur */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute h-72 w-72 rounded-full bg-primary-light blur-3xl opacity-60"
      />

      {/* Card */}

      <div className="relative flex flex-col items-center rounded-3xl bg-white px-10 py-10 shadow-2xl">

        <div className="rounded-full bg-primary-light p-5">

          <Loader2
            size={44}
            className="animate-spin text-(--color-primary)"
          />

        </div>

        <h2 className="mt-6 text-xl font-bold text-(--color-text-main)">
          CraveCart
        </h2>

        <p className="mt-2 text-center text-text-muted">
          {text}
        </p>

      </div>

    </div>
  );
}