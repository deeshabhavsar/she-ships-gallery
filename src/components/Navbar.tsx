import { Link } from "react-router-dom";
import { Send } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/gallery" className="text-xl font-bold text-foreground">
          SheBuilds 💜
        </Link>
        <Link
          to="/submit"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary px-5 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          <Send className="w-3.5 h-3.5" /> Submit Project
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
