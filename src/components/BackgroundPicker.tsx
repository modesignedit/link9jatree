import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Image, Upload, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BackgroundPickerProps {
  userId: string;
  backgroundType: string;
  backgroundValue: string;
  backgroundImageUrl: string;
  onChange: (type: string, value: string, imageUrl?: string) => void;
}

const GRADIENT_PRESETS = [
  { id: "aurora", name: "Aurora", colors: "from-slate-950 via-purple-950 to-black" },
  { id: "sunset", name: "Sunset", colors: "from-orange-950 via-rose-950 to-slate-950" },
  { id: "ocean", name: "Ocean", colors: "from-slate-950 via-cyan-950 to-blue-950" },
  { id: "forest", name: "Forest", colors: "from-slate-950 via-emerald-950 to-green-950" },
  { id: "midnight", name: "Midnight", colors: "from-slate-950 via-indigo-950 to-violet-950" },
  { id: "rose", name: "Rose", colors: "from-slate-950 via-pink-950 to-rose-950" },
];

const SOLID_COLORS = [
  { id: "slate", name: "Slate", color: "#0f172a" },
  { id: "zinc", name: "Zinc", color: "#18181b" },
  { id: "neutral", name: "Neutral", color: "#171717" },
  { id: "stone", name: "Stone", color: "#1c1917" },
  { id: "purple", name: "Purple", color: "#1e1b4b" },
  { id: "blue", name: "Blue", color: "#172554" },
];

const BackgroundPicker = ({
  userId,
  backgroundType,
  backgroundValue,
  backgroundImageUrl,
  onChange,
}: BackgroundPickerProps) => {
  const [activeTab, setActiveTab] = useState<"gradient" | "solid" | "image">(
    backgroundType as "gradient" | "solid" | "image" || "gradient"
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `bg_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      onChange("image", "custom", publicUrl);
      toast.success("Background uploaded! 🎨");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-2">
        {[
          { id: "gradient", icon: Palette, label: "Gradients" },
          { id: "solid", icon: Palette, label: "Solid" },
          { id: "image", icon: Image, label: "Image" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 gap-2 h-10 text-xs sm:text-sm ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-white/5 border border-white/10 text-muted-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "gradient" && (
          <motion.div
            key="gradient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-2"
          >
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onChange("gradient", preset.id)}
                className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  backgroundType === "gradient" && backgroundValue === preset.id
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${preset.colors}`} />
                <div className="absolute inset-0 flex items-end justify-center pb-1.5 sm:pb-2">
                  <span className="text-[10px] sm:text-xs text-white/70 font-medium">{preset.name}</span>
                </div>
                {backgroundType === "gradient" && backgroundValue === preset.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {activeTab === "solid" && (
          <motion.div
            key="solid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-2"
          >
            {SOLID_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange("solid", color.color)}
                className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  backgroundType === "solid" && backgroundValue === color.color
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{ backgroundColor: color.color }}
              >
                <div className="absolute inset-0 flex items-end justify-center pb-1.5 sm:pb-2">
                  <span className="text-[10px] sm:text-xs text-white/70 font-medium">{color.name}</span>
                </div>
                {backgroundType === "solid" && backgroundValue === color.color && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {activeTab === "image" && (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {backgroundImageUrl && backgroundType === "image" ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-primary">
                <img
                  src={backgroundImageUrl}
                  alt="Background preview"
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-white/20 backdrop-blur-sm border-white/20"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onChange("gradient", "aurora")}
                    className="bg-white/20 backdrop-blur-sm border-white/20"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 sm:h-40 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 transition-colors flex flex-col items-center justify-center gap-2 bg-white/5"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <span className="text-sm text-muted-foreground">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload background image</span>
                    <span className="text-xs text-muted-foreground/60">Max 10MB • JPG, PNG, WebP</span>
                  </>
                )}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundPicker;
