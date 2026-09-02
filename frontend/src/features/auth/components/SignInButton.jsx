import {motion} from "framer-motion";
import useAuthStore from "../../../store/auth.store.js";

const SignInButton = ({title,loading})=>{


  return (

<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.96 }}
  className="
    relative
    block-auto
    w-full mt-2
    overflow-hidden
    rounded-full
   bg-linear-to-r
    from-secondary
    via-primary
    to-primary-active
    px-8
    py-3
    font-semibold
    text-white
    shadow-lg
    shadow-primary-hover/20
    cursor-pointer
    transition-all
    duration-300
    hover:shadow-2xl
    hover:shadow-primary-hover/20
    disabled:cursor-not-allowed
  "
  disabled={loading}
>
  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
  <span className="relative">{title}</span>
</motion.button>
  )
}


export default SignInButton