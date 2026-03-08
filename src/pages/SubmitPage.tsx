import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import SparkleBackground from "@/components/SparkleBackground";

const TAG_OPTIONS = ["AI", "Productivity", "Health", "Education", "Fun", "Other"];

const SubmitPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    builder_name: "",
    project_name: "",
    description: "",
    project_link: "",
    tags: [] as string[],
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const uploadFile = async (file: File, bucket: string) => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.builder_name || !form.project_name || !form.description || !form.project_link) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.description.length > 200) {
      setError("Description must be 200 characters or less.");
      return;
    }
    if (form.tags.length === 0) {
      setError("Please select at least one tag.");
      return;
    }

    setSubmitting(true);
    try {
      let avatar_url = null;
      let screenshot_url = null;

      if (avatarFile) avatar_url = await uploadFile(avatarFile, "avatars");
      if (screenshotFile) screenshot_url = await uploadFile(screenshotFile, "screenshots");

      const { error: insertError } = await supabase.from("projects").insert({
        ...form,
        avatar_url,
        screenshot_url,
      });

      if (insertError) throw insertError;

      // Celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#f59e0b", "#ffffff"],
      });

      setTimeout(() => navigate("/gallery"), 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SparkleBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-display font-black mb-2 text-foreground">
            Submit Your Project <span className="text-gradient-gold">✨</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            She imagined it, she built it. Now share it with the world.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={form.builder_name}
                onChange={(e) => setForm({ ...form, builder_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. Deesha Bhavsar"
                maxLength={100}
              />
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={form.project_name}
                onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. SheBuilds Gallery"
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Short Description * <span className="text-muted-foreground font-normal">({form.description.length}/200)</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={3}
                maxLength={200}
                placeholder="What does your project do?"
              />
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project Link *
              </label>
              <input
                type="url"
                value={form.project_link}
                onChange={(e) => setForm({ ...form, project_link: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://your-project.lovable.app"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tags * <span className="text-muted-foreground font-normal">(select at least one)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      form.tags.includes(tag)
                        ? "gradient-gold text-accent-foreground border-accent"
                        : "bg-card text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {form.tags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Profile Photo <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {avatarFile ? avatarFile.name : "Choose a photo..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project Screenshot <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {screenshotFile ? screenshotFile.name : "Choose a screenshot..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {error && (
              <p className="text-destructive text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full gradient-gold text-accent-foreground font-bold text-lg py-4 rounded-full hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Your Project 🚀"}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitPage;
