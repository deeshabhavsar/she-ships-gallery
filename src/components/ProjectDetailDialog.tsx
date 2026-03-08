import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, MessageCircle, Send, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase, type Project, type Feedback } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const tagStyles: Record<string, string> = {
  AI: "bg-primary/10 text-primary",
  Health: "bg-secondary/10 text-secondary",
  Productivity: "bg-primary/10 text-primary",
  Education: "bg-secondary/10 text-secondary",
  Fun: "bg-primary/10 text-primary",
  Other: "bg-muted text-muted-foreground",
};

interface Props {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailDialog = ({ project, open, onOpenChange }: Props) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!project || !open) return;
    const fetchFeedback = async () => {
      const { data } = await supabase
        .from("feedback")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false });
      setFeedbacks((data as Feedback[]) || []);
    };
    fetchFeedback();
  }, [project, open]);

  const handleSubmitFeedback = async () => {
    if (!message.trim() || !project) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("feedback")
      .insert({ project_id: project.id, message: message.trim() });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not submit feedback.", variant: "destructive" });
    } else {
      toast({ title: "Feedback sent! 💜" });
      setMessage("");
      // Refresh
      const { data } = await supabase
        .from("feedback")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false });
      setFeedbacks((data as Feedback[]) || []);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-foreground">{project.project_name}</DialogTitle>
        </DialogHeader>

        {/* Screenshot */}
        {project.screenshot_url && (
          <div className="rounded-xl overflow-hidden border border-border">
            <img
              src={project.screenshot_url}
              alt={`${project.project_name} screenshot`}
              className="w-full h-56 object-cover"
            />
          </div>
        )}

        {/* Builder info */}
        <div className="flex items-center gap-3">
          {project.avatar_url ? (
            <img
              src={project.avatar_url}
              alt={project.builder_name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {project.builder_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-foreground">{project.builder_name}</p>
            {project.linkedin_url && (
              <a
                href={project.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Sparkles className="w-3 h-3" /> Built with Lovable
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagStyles[tag] || tagStyles.Other}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project link */}
        <a
          href={project.project_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full w-fit text-sm"
        >
          Try It Out <ArrowRight className="w-4 h-4" />
        </a>

        {/* Feedback section */}
        <div className="border-t border-border pt-4 mt-2">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4" /> Feedback
          </h3>

          <div className="flex gap-2 mb-4">
            <Textarea
              placeholder="Leave some feedback for this project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[60px] text-sm bg-background"
            />
            <Button
              onClick={handleSubmitFeedback}
              disabled={!message.trim() || submitting}
              size="icon"
              className="shrink-0 self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {feedbacks.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No feedback yet. Be the first! 💜</p>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {feedbacks.map((fb, i) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-muted rounded-lg p-3 text-sm text-foreground"
                >
                  <p>{fb.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(fb.created_at).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;
