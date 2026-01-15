import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Save,
  LogOut,
  User,
  Link as LinkIcon,
  Wallet,
  Plus,
  Trash2,
  GripVertical,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      // Fetch profile
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

      // Fetch links
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
      // Update profile
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

      // Delete existing links and insert new ones
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

      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save changes");
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
          // Update icon when platform changes
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />

      <div className="relative max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </a>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-white/10 hover:bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Profile Settings
            </h2>
          </div>

          <div className="grid gap-5">
            {/* Avatar Preview */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 ring-2 ring-primary/30">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="avatar" className="text-foreground/80">
                  Avatar URL
                </Label>
                <Input
                  id="avatar"
                  placeholder="https://example.com/avatar.jpg"
                  value={profile.avatar_url}
                  onChange={(e) =>
                    setProfile({ ...profile, avatar_url: e.target.value })
                  }
                  className="mt-1 bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name" className="text-foreground/80">
                Display Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={profile.display_name}
                onChange={(e) =>
                  setProfile({ ...profile, display_name: e.target.value })
                }
                className="mt-1 bg-white/5 border-white/10"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-foreground/80">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell the world about yourself..."
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="mt-1 bg-white/5 border-white/10 resize-none"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="live" className="text-foreground/80">
                Live Stream URL
              </Label>
              <Input
                id="live"
                placeholder="https://twitch.tv/yourname"
                value={profile.live_url}
                onChange={(e) =>
                  setProfile({ ...profile, live_url: e.target.value })
                }
                className="mt-1 bg-white/5 border-white/10"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-twitter/20">
                <LinkIcon className="w-5 h-5 text-twitter" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Social Links
              </h2>
            </div>
            <Button
              onClick={addLink}
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-foreground"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Link
            </Button>
          </div>

          <div className="space-y-4">
            {links.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No links yet. Add your first social link!
              </p>
            ) : (
              links.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="pt-2 text-muted-foreground cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Platform
                        </Label>
                        <Select
                          value={link.platform}
                          onValueChange={(value) =>
                            updateLink(link.id, { platform: value })
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white/5 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PLATFORM_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Label
                        </Label>
                        <Input
                          value={link.label}
                          onChange={(e) =>
                            updateLink(link.id, { label: e.target.value })
                          }
                          className="mt-1 bg-white/5 border-white/10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">URL</Label>
                      <Input
                        value={link.url}
                        onChange={(e) =>
                          updateLink(link.id, { url: e.target.value })
                        }
                        placeholder="https://..."
                        className="mt-1 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(link.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Crypto Wallets Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-btc/20">
              <Wallet className="w-5 h-5 text-btc" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Crypto Wallets
            </h2>
          </div>

          <div className="grid gap-5">
            <div>
              <Label htmlFor="btc" className="text-foreground/80">
                Bitcoin (BTC) Address
              </Label>
              <Input
                id="btc"
                placeholder="bc1q..."
                value={profile.btc_address}
                onChange={(e) =>
                  setProfile({ ...profile, btc_address: e.target.value })
                }
                className="mt-1 bg-white/5 border-white/10 font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="usdt" className="text-foreground/80">
                USDT (ERC-20) Address
              </Label>
              <Input
                id="usdt"
                placeholder="0x..."
                value={profile.usdt_address}
                onChange={(e) =>
                  setProfile({ ...profile, usdt_address: e.target.value })
                }
                className="mt-1 bg-white/5 border-white/10 font-mono text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;
