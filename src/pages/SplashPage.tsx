import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(270 60% 70%) 0%, hsl(330 80% 65%) 40%, hsl(350 85% 60%) 70%, hsl(15 80% 65%) 100%)",
      }}
    >
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-white/90 text-sm sm:text-base font-semibold mb-4"
        >
          International Women's Day
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl sm:text-8xl md:text-9xl font-black text-white leading-none mb-6"
        >
          SheBuilds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/80 mb-12 max-w-xl mx-auto"
        >
          The age of the builder is here. And it's for everyone.
          <br />
          Join our celebration March 8th.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate("/gallery")}
            className="bg-foreground text-background font-semibold text-base px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Explore Projects
          </button>
          <button
            onClick={() => navigate("/submit")}
            className="bg-white/20 backdrop-blur-sm text-white font-semibold text-base px-8 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all"
          >
            Submit Project
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashPage;
