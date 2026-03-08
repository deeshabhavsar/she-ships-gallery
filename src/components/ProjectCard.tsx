import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Project } from "@/lib/supabase";

const tagStyles: Record<string, string> = {
  AI: "bg-primary/10 text-primary",
  Health: "bg-secondary/10 text-secondary",
  Productivity: "bg-primary/10 text-primary",
  Education: "bg-secondary/10 text-secondary",
  Fun: "bg-primary/10 text-primary",
  Other: "bg-muted text-muted-foreground",
};

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
    >
      {project.screenshot_url ? (
        <div className="h-44 overflow-hidden">
          <img
            src={project.screenshot_url}
            alt={`${project.project_name} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-44 gradient-primary opacity-20" />
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          {project.avatar_url ? (
            <img
              src={project.avatar_url}
              alt={project.builder_name}
              className="w-10 h-10 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {project.builder_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground truncate">
              {project.project_name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.builder_name}
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
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagStyles[tag] || tagStyles.Other}`}
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
          >
            Try It Out <ArrowRight className="w-3.5 h-3.5" />
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
