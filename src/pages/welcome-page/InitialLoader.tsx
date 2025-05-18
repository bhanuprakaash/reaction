import { motion } from "framer-motion";
import HeadingLoader from "../../components/Loader/HeadingLoader";
import { useNavigate } from "react-router-dom";

export default function InitialLoader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen text-white flex-col gap-6">
      <HeadingLoader />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-sm text-gray-400"
      >
        Booting up your React journey...
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 px-8 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-lg transition-all duration-300"
        onClick={() => navigate("/playground")}
      >
        Tap to React
      </motion.button>
    </div>
  );
}
