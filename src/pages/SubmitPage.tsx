import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Check, Linkedin } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TAG_OPTIONS = ["AI", "Productivity", "Health", "Education", "Fun", "Other"];

const SubmitPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    builder_name: "",
    project_name: "",
    description: "",
    project_link: "",
    linkedin_url: "",
    attended_shebuilds: false,
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

      const { attended_shebuilds, ...rest } = form;
      const { error: insertError } = await supabase.from("projects").insert({
        ...rest,
        location: attended_shebuilds ? "SheBuilds" : null,
        avatar_url,
        screenshot_url,
      });

      if (insertError) throw insertError;

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7C3AED", "#EC4899", "#F59E0B", "#ffffff"],
      });

      setTimeout(() => navigate("/gallery"), 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={() => navigate("/gallery")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-black mb-2">
            <span className="text-gradient">Submit Your Project</span> ✨
          </h1>
          <p className="text-muted-foreground mb-8">
            She imagined it, she built it. Now share it with the world.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
              <input
                type="text"
                value={form.builder_name}
                onChange={(e) => setForm({ ...form, builder_name: e.target.value })}
                className={inputClass}
                placeholder="e.g. Deesha Bhavsar"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Project Name *</label>
              <input
                type="text"
                value={form.project_name}
                onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                className={inputClass}
                placeholder="e.g. SheBuilds Gallery"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Short Description * <span className="text-muted-foreground font-normal">({form.description.length}/200)</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`${inputClass} resize-none`}
                rows={3}
                maxLength={200}
                placeholder="What does your project do?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Project Link *</label>
              <input
                type="url"
                value={form.project_link}
                onChange={(e) => setForm({ ...form, project_link: e.target.value })}
                className={inputClass}
                placeholder="https://your-project.lovable.app"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                LinkedIn Profile <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  value={form.linkedin_url}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  className={`${inputClass} pl-11`}
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="attended_shebuilds"
                checked={form.attended_shebuilds}
                onCheckedChange={(checked) => setForm({ ...form, attended_shebuilds: !!checked })}
              />
              <label htmlFor="attended_shebuilds" className="text-sm font-medium text-foreground cursor-pointer">
                I attended a SheBuilds event
              </label>
            </div>

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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      form.tags.includes(tag)
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {form.tags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Profile Photo <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary/40 transition-colors">
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

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project Screenshot <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary/40 transition-colors">
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
              className="w-full gradient-primary text-primary-foreground font-semibold text-lg py-4 rounded-full hover:shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit My Project 🚀"}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitPage;
