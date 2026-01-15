import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Link as LinkIcon, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Zap, 
  ArrowRight,
  ChevronRight,
  Star,
  Check,
  Play,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePWA } from "@/hooks/usePWA";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedOrbs from "@/components/AnimatedOrbs";

const FEATURES = [
  {
    icon: LinkIcon,
    title: "One Link, All Your Socials",
    description: "Drop all your links in one fire spot. No cap.",
    emoji: "🔗",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Custom Vibes Only",
    description: "Themes, colors, animations. Make it yours fr fr.",
    emoji: "🎨",
    color: "from-pink-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Track Your Clout",
    description: "See who's checking you out. Analytics that hit different.",
    emoji: "📊",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Install It, Own It",
    description: "Works offline. Add to home screen. Lowkey an app.",
    emoji: "📱",
    color: "from-green-500 to-emerald-500",
  },
];

const TESTIMONIALS = [
  { name: "Alex", handle: "@alexcreates", text: "This is literally the best link in bio I've ever used 🔥", avatar: "😎" },
  { name: "Jordan", handle: "@jordanvibes", text: "The customization options are insane no cap", avatar: "🤩" },
  { name: "Sam", handle: "@sambuilds", text: "My profile views went up 300% fr", avatar: "🚀" },
];

const Landing = () => {
  const { user } = useAuth();
  const { canInstall, installApp } = usePWA();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground particleCount={30} />
      <AnimatedOrbs />
      
      {/* Aurora effect */}
      <div className="absolute inset-0 aurora-bg aurora-animated opacity-50" />
      
      {/* Navigation */}
      <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground font-['Space_Grotesk'] hidden sm:block">
              LinkBio
            </span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {canInstall && (
              <Button
                onClick={installApp}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-2 hidden sm:flex"
              >
                <Download className="w-4 h-4" />
                Install
              </Button>
            )}
            <Link to="/demo">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Demo
              </Button>
            </Link>
            {user ? (
              <Link to="/editor">
                <Button size="sm" className="bg-gradient-to-r from-primary to-pink-600 gap-2">
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-to-r from-primary to-pink-600 gap-2">
                  Get Started
                  <Sparkles className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Link-in-Bio That Hits Different</span>
            <span className="text-lg">✨</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 font-['Space_Grotesk'] leading-tight"
          >
            Your <span className="text-gradient">Digital Presence</span>
            <br />
            <span className="inline-flex items-center gap-2 sm:gap-4">
              Made 
              <span className="relative inline-block">
                <span className="relative z-10">Fire</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-primary via-pink-500 to-orange-500 rounded-full opacity-50"
                  animate={{ scaleX: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              🔥
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            Create a stunning link-in-bio page in seconds. 
            <span className="text-foreground font-medium"> Custom themes, analytics, animations</span> — 
            everything you need to stand out. No cap.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={user ? "/editor" : "/auth"}>
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary via-pink-600 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 rounded-full px-8 h-14 text-lg gap-3 shadow-2xl shadow-primary/30">
                {user ? "Go to Dashboard" : "Create Your Page"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg gap-3 border-white/20 hover:bg-white/5">
                <Play className="w-5 h-5" />
                See Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            <div className="flex -space-x-3">
              {["😎", "🤩", "🚀", "💫", "🔥"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-pink-500/20 border-2 border-background flex items-center justify-center text-lg"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">10k+</span> creators are vibing
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-['Space_Grotesk'] mb-4">
              Features That Slap <span className="text-gradient">Hard</span> 💪
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to make your online presence absolutely bussin'
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-strong rounded-2xl sm:rounded-3xl p-6 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-['Space_Grotesk']">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-['Space_Grotesk'] mb-4">
              The Hype Is <span className="text-gradient">Real</span> 🗣️
            </h2>
          </motion.div>

          <div className="relative h-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center"
              >
                <p className="text-lg sm:text-xl text-foreground mb-4">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{TESTIMONIALS[activeTestimonial].avatar}</span>
                  <div>
                    <p className="font-semibold text-foreground">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{TESTIMONIALS[activeTestimonial].handle}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeTestimonial ? "w-8 bg-primary" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-pink-600 to-orange-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4 sm:mb-6">
                Ready to Go Viral? 🚀
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of creators who are already leveling up their online game.
              </p>
              <Link to={user ? "/editor" : "/auth"}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 sm:px-12 h-14 text-lg font-semibold gap-3 shadow-2xl">
                  {user ? "Open Dashboard" : "Start for Free"}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-white/60 mt-4">
                No credit card required • Set up in 60 seconds
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground font-['Space_Grotesk']">LinkBio</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/demo" className="hover:text-foreground transition-colors">Demo</Link>
              <Link to="/install" className="hover:text-foreground transition-colors">Install</Link>
              <Link to="/auth" className="hover:text-foreground transition-colors">Login</Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Made with 💜 for creators
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
