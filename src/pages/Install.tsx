import { motion } from "framer-motion";
import { Download, Smartphone, Check, Share, Plus, ArrowLeft, Apple, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { Link } from "react-router-dom";

const Install = () => {
  const { canInstall, isInstalled, installApp } = usePWA();

  const handleInstall = async () => {
    await installApp();
  };

  // Detect platform
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg aurora-animated opacity-70" />
      
      {/* Floating orbs */}
      <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl float opacity-50" />
      <div className="hidden sm:block absolute bottom-40 right-10 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl float-delayed opacity-50" />

      <div className="relative max-w-md mx-auto px-4 py-8 safe-area-top safe-area-bottom">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-naija-green to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-naija-green/30">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Install Link9jtree</h1>
          <p className="text-muted-foreground">
            Get the full app experience - FREE for all Naija creators! 🇳🇬
          </p>
        </motion.div>

        {/* Already installed */}
        {isInstalled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl p-6 text-center mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-naija-green/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-naija-green" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Already Installed!</h2>
            <p className="text-sm text-muted-foreground">
              Link9jtree don dey your home screen. Open am from there for the best experience.
            </p>
          </motion.div>
        )}

        {/* Install button for Chrome/Android */}
        {canInstall && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Button
              onClick={handleInstall}
              size="lg"
              className="w-full bg-gradient-to-r from-naija-green to-emerald-500 hover:from-naija-green/90 hover:to-emerald-500/90 rounded-xl h-14 text-lg gap-3"
            >
              <Download className="w-5 h-5" />
              Install App
            </Button>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-6 mb-6"
        >
          <h2 className="font-semibold text-foreground mb-4">Why install?</h2>
          <div className="space-y-4">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Loads instantly, even on slow connections" },
              { icon: "📱", title: "Works Offline", desc: "Access your profile without internet" },
              { icon: "🎨", title: "Full Screen", desc: "No browser bars, just your content" },
              { icon: "🔔", title: "Stay Updated", desc: "Get notified about profile activity" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl">{feature.icon}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* iOS Instructions */}
        {isIOS && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-5 h-5 text-foreground" />
              <h2 className="font-semibold text-foreground">Install on iPhone/iPad</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tap the</span>
                  <Share className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Share button</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">2</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Scroll and tap</span>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10">
                    <Plus className="w-4 h-4" />
                    <span className="text-xs font-medium">Add to Home Screen</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">3</div>
                <span className="text-sm text-muted-foreground">Tap "Add" to install</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Android/Chrome Instructions */}
        {isAndroid && !canInstall && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Chrome className="w-5 h-5 text-foreground" />
              <h2 className="font-semibold text-foreground">Install on Android</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</div>
                <span className="text-sm text-muted-foreground">Open in Chrome browser</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">2</div>
                <span className="text-sm text-muted-foreground">Tap the menu (⋮) in Chrome</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">3</div>
                <span className="text-sm text-muted-foreground">Tap "Add to Home screen"</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Desktop Instructions */}
        {!isIOS && !isAndroid && !canInstall && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Chrome className="w-5 h-5 text-foreground" />
              <h2 className="font-semibold text-foreground">Install on Desktop</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Look for the install icon in your browser's address bar, or:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</div>
                <span className="text-sm text-muted-foreground">Open Chrome menu (⋮)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-naija-green/20 flex items-center justify-center text-sm font-bold text-naija-green">2</div>
                <span className="text-sm text-muted-foreground">Click "Install Link9jtree..."</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Install;
