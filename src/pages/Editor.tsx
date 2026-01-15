import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Save,
  LogOut,
  User,
  Plus,
  Loader2,
  Camera,
  ArrowLeft,
  Bitcoin,
  DollarSign,
  Radio,
  ImagePlus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PhonePreview } from "@/components/PhonePreview";
import { LinkCardEditor } from "@/components/LinkCardEditor";

interface Profile {
  display_name: string;
  bio: string;
  avatar_url: string;
  live_url: string;
  btc_address: string;
  usdt_address: string;
}

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  display_order: number;
}

const PLATFORM_OPTIONS = [
  { value: "portfolio", label: "Portfolio", icon: "Briefcase" },
  { value: "twitter", label: "Twitter / X", icon: "Twitter" },
  { value: "instagram", label: "Instagram", icon: "Instagram" },
  { value: "github", label: "GitHub", icon: "Github" },
  { value: "linkedin", label: "LinkedIn", icon: "Linkedin" },
  { value: "youtube", label: "YouTube", icon: "Youtube" },
  { value: "tiktok", label: "TikTok", icon: "Music2" },
  { value: "custom", label: "Custom Link", icon: "Link" },
];

const Editor = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    bio: "",
    avatar_url: "",
    live_url: "",
    btc_address: "",
    usdt_address: "",
  });
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile({
          display_name: profileData.display_name || "",
          bio: profileData.bio || "",
          avatar_url: profileData.avatar_url || "",
          live_url: profileData.live_url || "",
          btc_address: profileData.btc_address || "",
          usdt_address: profileData.usdt_address || "",
        });
      }

      const { data: linksData } = await supabase
        .from("social_links")
        .select("*")
        .eq("user_id", user.id)
        .order("display_order");

      if (linksData) {
        setLinks(linksData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          display_name: profile.display_name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          live_url: profile.live_url,
          btc_address: profile.btc_address,
          usdt_address: profile.usdt_address,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      await supabase.from("social_links").delete().eq("user_id", user.id);

      if (links.length > 0) {
        const { error: linksError } = await supabase.from("social_links").insert(
          links.map((link, index) => ({
            user_id: user.id,
            platform: link.platform,
            label: link.label,
            url: link.url,
            icon: link.icon,
            display_order: index,
          }))
        );

        if (linksError) throw linksError;
      }

      toast.success("Saved! Your page is live ✨", {
        icon: "🎉",
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Oops! Something went wrong 😅");
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    const newLink: SocialLink = {
      id: crypto.randomUUID(),
      platform: "custom",
      label: "New Link",
      url: "https://",
      icon: "Link",
      display_order: links.length,
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<SocialLink>) => {
    setLinks(
      links.map((link) => {
        if (link.id === id) {
          if (updates.platform) {
            const platform = PLATFORM_OPTIONS.find(
              (p) => p.value === updates.platform
            );
            return {
              ...link,
              ...updates,
              icon: platform?.icon || "Link",
              label: platform?.label || link.label,
            };
          }
          return { ...link, ...updates };
        }
        return link;
      })
    );
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar_url: publicUrl });
      toast.success("Avatar uploaded! 📸");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <span className="text-muted-foreground">Loading your vibe...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />
      
      {/* Floating orbs - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Hidden file input for avatar upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Profile</span>
          </a>
          
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </motion.header>

        {/* Main Content - Bento Grid */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Left Column - Phone Preview (hidden on mobile/tablet) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="sticky top-6">
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground/70">Live Preview ✨</span>
              </div>
              <PhonePreview profile={profile} links={links} />
            </div>
          </motion.div>

          {/* Right Column - Editor Cards */}
          <div className="space-y-4 sm:space-y-6">
            {/* Your Vibe - Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <span className="text-xl sm:text-2xl">✨</span>
                <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Your Vibe</h2>
              </div>

              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="relative group cursor-pointer"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-pink-500/20 ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all">
                    {uploading ? (
                      <div className="w-full h-full flex items-center justify-center bg-background/80">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                    ) : profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <ImagePlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <span className="text-[10px] sm:text-xs text-white font-medium">Change</span>
                    </div>
                  </div>
                </button>
                <p className="text-xs text-muted-foreground/60 mt-2">Tap to upload</p>
              </div>

              {/* Name & Live URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1.5 block">Your Name</label>
                  <Input
                    placeholder="What should we call you? 👋"
                    value={profile.display_name}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-2">
                    <Radio className="w-3 h-3 text-live" />
                    Live Stream
                  </label>
                  <Input
                    placeholder="Streaming? Drop the link 🎮"
                    value={profile.live_url}
                    onChange={(e) => setProfile({ ...profile, live_url: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-1.5 block">Bio 💬</label>
                <Textarea
                  placeholder="Your bio in a nutshell..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl resize-none text-sm placeholder:text-muted-foreground/50"
                  rows={3}
                />
              </div>
            </motion.div>

            {/* Your Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-5 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">🔗</span>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Your Links</h2>
                  {links.length > 0 && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      {links.length}
                    </span>
                  )}
                </div>
                <Button
                  onClick={addLink}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 rounded-full px-4 h-10 sm:h-9 text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </div>

              {links.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="text-3xl sm:text-4xl mb-3">🌟</div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    No links yet. Add your first one!
                  </p>
                </motion.div>
              ) : (
                <Reorder.Group
                  axis="y"
                  values={links}
                  onReorder={setLinks}
                  className="space-y-2 sm:space-y-3"
                >
                  <AnimatePresence mode="popLayout">
                    {links.map((link) => (
                      <Reorder.Item
                        key={link.id}
                        value={link}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        whileDrag={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                          zIndex: 50,
                        }}
                        className="cursor-default"
                      >
                        <LinkCardEditor
                          link={link}
                          onUpdate={updateLink}
                          onRemove={removeLink}
                          platformOptions={PLATFORM_OPTIONS}
                        />
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              )}
            </motion.div>

            {/* Get Paid Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <span className="text-xl sm:text-2xl">💰</span>
                <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Get Paid</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-btc/10 border border-btc/20">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Bitcoin className="w-4 h-4 sm:w-5 sm:h-5 text-btc" />
                    <span className="text-sm font-medium text-foreground">Bitcoin</span>
                  </div>
                  <Input
                    placeholder="bc1q... your BTC address"
                    value={profile.btc_address}
                    onChange={(e) => setProfile({ ...profile, btc_address: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-10 font-mono text-xs sm:text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
                
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-usdt/10 border border-usdt/20">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-usdt" />
                    <span className="text-sm font-medium text-foreground">USDT (TRC20)</span>
                  </div>
                  <Input
                    placeholder="T... your USDT address"
                    value={profile.usdt_address}
                    onChange={(e) => setProfile({ ...profile, usdt_address: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-10 font-mono text-xs sm:text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-gradient-to-r from-primary via-pink-600 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 rounded-full px-8 shadow-2xl shadow-primary/25 group"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Save Changes
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default Editor;
