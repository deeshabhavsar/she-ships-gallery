import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SparkleBackground from "@/components/SparkleBackground";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <SparkleBackground />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6">
            <span className="text-gradient">Happy Women's Day</span>{" "}
            <span>💜</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10"
        >
          To every woman who dared to imagine — and then built it.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/gallery")}
          className="gradient-primary text-primary-foreground font-semibold text-lg px-10 py-4 rounded-full shadow-soft hover:shadow-hover transition-all duration-300"
        >
          Explore Projects ✨
        </motion.button>
      </div>
    </div>
  );
};

export default SplashPage;
