import { FiAlertCircle } from "react-icons/fi";
import {motion} from "framer-motion";


const ErrorText = ({ message }) => (
    <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
    >
        <FiAlertCircle size={12} />
        {message}
    </motion.p>
);

export default ErrorText;