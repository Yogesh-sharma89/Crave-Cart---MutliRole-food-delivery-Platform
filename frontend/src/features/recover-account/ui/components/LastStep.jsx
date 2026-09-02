import {motion} from "framer-motion";
import { ArrowRight, CheckCircle2Icon, ShieldCheck } from "lucide-react";
import {useNavigate} from "react-router"

const LastStep = ({variants}) => {

    const navigate = useNavigate();

    return (
        <motion.div
            key="success"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="py-8 text-center"
        >

            <motion.div
                initial={{
                    scale: 0,
                }}

                animate={{
                    scale: 1,
                }}

                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}

                className="
                    mx-auto
                    flex
                    size-20
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-green-600
                  "
            >
                <CheckCircle2Icon size={42} />
            </motion.div>


            <h1 className="
                  mt-7
                  text-3xl
                  font-semibold
                  text-neutral-900
                ">
                Password updated!
            </h1>


            <p className="
                  mx-auto
                  mt-3
                  max-w-sm
                  text-sm
                  leading-6
                  text-neutral-500
                ">
                Your password has been successfully
                updated. You can now sign in using
                your new password.
            </p>


            <motion.button
                whileHover={{
                    scale: 1.02,
                }}

                whileTap={{
                    scale: 0.98,
                }}

                onClick={() => {
                    navigate("/login")
                }}

                className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-linear-to-r
                    from-[#b98243]
                    via-[#a87335]
                    to-[#94602b]
                    px-6
                    py-4
                    font-semibold
                    text-white
                  "
            >

                Back to login

                <ArrowRight size={20} />

            </motion.button>


            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-neutral-400
                  "
            >

                <ShieldCheck size={15} />

                Your account is secure

            </div>

        </motion.div>
    )
}

export default LastStep
