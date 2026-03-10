import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { supabase, type Project } from "@/lib/supabase";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailDialog from "@/components/ProjectDetailDialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SparkleBackground from "@/components/SparkleBackground";

const ALL_TAGS = ["AI", "Productivity", "Health", "Education", "Fun", "Other"];
const ALL_LOCATIONS = ["New York", "London", "Remote / Online"];

const GalleryPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
          >
            <span className="text-gradient">She Builds. She Ships. She Inspires.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A community showcase of projects built at SheBuilds 2026
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Search & Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by project or builder name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !activeTag
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
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
              <div key={i} className="bg-muted rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No projects found yet</p>
            <a
              href="/submit"
              className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-full"
            >
              Be the first to submit! ✨
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        )}
      </section>

      <ProjectDetailDialog
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />

      <Footer />
    </div>
  );
};

export default GalleryPage;
