import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/lib/supabase";

const tagColors: Record<string, string> = {
  AI: "bg-primary/20 text-primary-foreground border-primary/30",
  Health: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  Productivity: "bg-accent/20 text-accent-foreground border-accent/30",
  Education: "bg-primary/20 text-primary-foreground border-primary/30",
  Fun: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  Other: "bg-muted text-muted-foreground border-border",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="gradient-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group"
    >
      {project.screenshot_url && (
        <div className="h-44 overflow-hidden">
          <img
            src={project.screenshot_url}
            alt={`${project.project_name} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          {project.avatar_url ? (
            <img
              src={project.avatar_url}
              alt={project.builder_name}
              className="w-10 h-10 rounded-full object-cover border-2 border-accent/50"
            />
          ) : (
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-accent-foreground font-bold text-sm">
              {project.builder_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-foreground truncate">
              {project.project_name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Built by <span className="text-accent font-medium">{project.builder_name}</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium ${tagColors[tag] || tagColors.Other}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <a
            href={project.project_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Try It Out <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" /> Built with Lovable
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
