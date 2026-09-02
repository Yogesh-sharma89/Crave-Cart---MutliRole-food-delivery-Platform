import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

function FormErrorMessage({ error }) {

  const message =
    typeof error === "string"
      ? error
      : error?.message;
      

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          initial={{
            opacity: 0,
            y: -4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -4,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-error"
          role="alert"
        >
          <motion.span
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
          >
            <AlertCircle className="size-4 shrink-0" />
          </motion.span>

          <span>{message}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default FormErrorMessage;