
import { motion } from 'framer-motion'; // 🌟 Smooth animation engine
import { FcGoogle } from 'react-icons/fc'; // Official Google brand mark
import { FiArrowRight } from 'react-icons/fi'; // Minimal interaction icon
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../config/firebase.config.js';
import { toast } from 'sonner';
import FullScreenLoader from './Loader.jsx';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth.jsx';
import useGoogleAuth from '../hooks/useGoogleAuth.jsx';

// err.response?.data?.message || "Failed to authencticate with google"
export default function GoogleButton() {

  const navigate = useNavigate();

  const { mutateAsync: googleAuth, isPending } = useGoogleAuth();
  const { role } = useAuth();

  const handleGoolgeAuth = async () => {

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      //now send this token to backend

      await toast.promise(googleAuth({ idToken, role }), {
        loading: 'Authenticating with Google...',
        success: () => {
          return "Google authentication successfull"
        },
        error: (err) => {
          if (err.response?.status === 403 && err.response?.data?.status === "scheduled_for_deletion") {
            navigate("/recover-account");
            return err.response.data.message || "Account is frozen";
          }

          return err.response?.data?.message || "Failed to authencticate with google"

        }
      }).unwrap();

      navigate("/");

    } catch (err) {
      console.log(err.message);
    }

  }

  if (isPending) {
    return (
      <FullScreenLoader text='Please wait...' />
    )
  }

  return (
    <div className="flex items-center justify-center w-full ">
      <motion.button
        type='button'
        onClick={handleGoolgeAuth}
        disabled={isPending}
        // 💫 Framer Motion Initial & Hover Settings
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          backgroundColor: "#F8FAFC", // --color-surface-hover
          borderColor: "#CBD5E1",     // --color-border-hover
          boxShadow: "0px 4px 12px rgba(15, 23, 42, 0.03)"
        }}
        whileTap={{ scale: 0.98 }} // Premium physical tap feedback
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
        className="
          group
          flex items-center justify-between 
          w-full max-w-sm px-5 py-3.5 
          bg-transparent 
          border border-border-main 
          rounded-xl 
          text-[#0F172A] 
          font-medium text-sm tracking-wide 
          cursor-pointer select-none
          focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2
        "
      >
        {/* Left Side: Branded Identity Elements */}
        <div className="flex items-center gap-3.5">
          <FcGoogle className="size-5 shrink-0" />
          <span className="text-[#0F172A]">Continue with Google</span>
        </div>

        {/* Right Side: Micro-Interaction Accent Arrow */}
        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: 4 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center text-text-muted group-hover:text-[#FF385C]"
        >
          <FiArrowRight className="w-4 h-4 transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </div>
  );
}
