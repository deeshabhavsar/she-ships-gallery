import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Rocket, Send } from "lucide-react";
import { supabase, type Project } from "@/lib/supabase";
import ProjectCard from "@/components/ProjectCard";
import SparkleBackground from "@/components/SparkleBackground";
import Footer from "@/components/Footer";

const ALL_TAGS = ["AI", "Productivity", "Health", "Education", "Fun", "Other"];

const GalleryPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects((data as Project[]) || []);
      setLoading(false);
    };
    fetchProjects();

    // Real-time subscription
    const channel = supabase
      .channel("projects-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "projects" }, (payload) => {
        setProjects((prev) => [payload.new as Project, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.builder_name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background relative">
      <SparkleBackground />

      {/* Hero */}
      <section className="relative z-10 gradient-hero animate-gradient pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-black mb-4 text-foreground"
          >
            She Builds <Rocket className="inline w-10 h-10 sm:w-14 sm:h-14 text-accent" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground/80 mb-2"
          >
            A showcase of projects built by incredible women
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-8"
          >
            SheBuilds 2025 · Women's Day Celebration
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/submit"
              className="inline-flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-bold px-8 py-3.5 rounded-full hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4" /> Submit Your Project
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 glass text-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-muted/40 transition-all duration-300"
            >
              View All Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Search & Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by project or builder name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                !activeTag
                  ? "gradient-gold text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeTag === tag
                    ? "gradient-gold text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gradient-card rounded-xl border border-border h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No projects found yet</p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 gradient-gold text-accent-foreground font-bold px-6 py-3 rounded-full"
            >
              Be the first to submit! ✨
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;
