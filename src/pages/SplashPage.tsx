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
          className="text-7xl sm:text-8xl md:text-9xl font-black text-white leading-none mb-8"
        >
          SheBuilds
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-9 sm:h-9 fill-white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-white font-bold text-xl sm:text-2xl">Lovable</span>
          </div>
          <div className="w-px h-8 bg-white/40" />
          <span className="text-white font-bold text-xl sm:text-2xl tracking-wide">ANTHROP\C</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/80 mb-12 max-w-xl mx-auto"
        >
          Here's to the women who build the world they want to live in.
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
