import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Link2, Palette, BarChart3, Smartphone, ArrowRight, ChevronRight, Star, Download, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePWA } from "@/hooks/usePWA";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import Logo from "@/components/Logo";
const FEATURES = [{
  icon: Link2,
  title: "One Link, All Your Socials",
  description: "Drop all your links for one spot. No shaking!",
  emoji: "🔗",
  color: "from-naija-green to-emerald-500"
}, {
  icon: Palette,
  title: "Custom Vibes Wey Burst",
  description: "Themes, colors, animations. Make am yours fr fr.",
  emoji: "🎨",
  color: "from-pink-500 to-orange-500"
}, {
  icon: BarChart3,
  title: "Track Your Clout",
  description: "See who dey check you out. Analytics wey hit different.",
  emoji: "📊",
  color: "from-cyan-500 to-blue-500"
}, {
  icon: Smartphone,
  title: "Install Am, Own Am",
  description: "Works offline. Add to home screen. No be small thing!",
  emoji: "📱",
  color: "from-naija-green to-naija-light"
}];
const TESTIMONIALS = [{
  name: "Chioma",
  handle: "@chioma_creates",
  text: "This app burst my head! Best link-in-bio I don ever use 🔥",
  avatar: "👸🏾"
}, {
  name: "Emeka",
  handle: "@emeka_vibes",
  text: "The customization na die! No be cap at all 💯",
  avatar: "🧔🏾"
}, {
  name: "Amara",
  handle: "@amara_builds",
  text: "My profile views don blow up fr. Na wetin I dey find! 🚀",
  avatar: "👩🏾‍💻"
}];
const Landing = () => {
  const {
    user
  } = useAuth();
  const {
    canInstall,
    installApp
  } = usePWA();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground particleCount={30} />
      <AnimatedOrbs />
      
      {/* Aurora effect */}
      <div className="absolute inset-0 aurora-bg aurora-animated opacity-50" />
      
      {/* Navigation */}
      <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" showBadge={true} />
          
          <div className="flex items-center gap-2 sm:gap-4">
            {canInstall && <Button onClick={installApp} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2 hidden sm:flex">
                <Download className="w-4 h-4" />
                Install
              </Button>}
            {user ? <Link to="/editor">
                <Button variant="naija" size="sm" className="gap-2">
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link> : <Link to="/auth">
                <Button variant="naija" size="sm" className="gap-2">
                  Get Started
                  <Sparkles className="w-4 h-4" />
                </Button>
              </Link>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Nigerian stripe decoration */}
          <motion.div initial={{
          scaleX: 0
        }} animate={{
          scaleX: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="naija-stripe-animated w-32 mx-auto mb-6" />

          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-naija-green/20 border border-naija-green/30 text-naija-light text-sm font-medium mb-6 sm:mb-8">
            <span className="text-lg animate-flag-fly">🇳🇬</span>
            <span>Free Forever for Naija Creators</span>
            <span className="text-lg animate-flag-sparkle">✨</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="text-foreground mb-6 text-balance">
            Your <span className="text-gradient">Digital Presence</span>
            <br />
            <span className="inline-flex items-center gap-3 sm:gap-4">
              Made 
              <span className="relative inline-block">
                <span className="relative z-10">Proper</span>
                <motion.span className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-naija-green via-naija-light to-emerald-400 rounded-full opacity-50" animate={{
                scaleX: [0.8, 1, 0.8]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </span>
              🔥
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">The free link-in-bio built with love for Nigerian creators. Custom themes, analytics, animations e dey burst brain! No charge, no wahala.<span className="text-foreground font-semibold"> Custom themes, analytics, animations</span> — 
            e dey burst brain! No charge, no wahala.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? "/editor" : "/auth"}>
              <Button variant="naija" size="xl" className="w-full sm:w-auto rounded-full gap-3">
                {user ? "Go to Dashboard" : "Start for Free"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }} className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex -space-x-3">
              {["👸🏾", "🧔🏾", "👩🏾‍💻", "🧑🏾‍🎤", "👨🏾‍💼"].map((emoji, i) => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-naija-green/20 to-emerald-500/20 border-2 border-background flex items-center justify-center text-lg">
                  {emoji}
                </div>)}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">10k+</span> Naija creators dey vibe
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-foreground mb-4 text-balance">
              Features Wey <span className="text-naija-light">Slap</span> 💪
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Everything wey you need to make your online presence burst properly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURES.map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -8,
            scale: 1.02
          }} className="glass-strong rounded-2xl sm:rounded-3xl p-6 group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-['Space_Grotesk']">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-foreground mb-4 text-balance">
              Wetin Naija Dey <span className="text-naija-light">Talk</span> 🗣️
            </h2>
          </motion.div>

          <div className="relative h-40">
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} className="absolute inset-0 glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
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
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-naija-green" : "bg-white/20"}`} />)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-naija-green via-emerald-500 to-naija-light" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              {/* Animated flag decoration */}
              <div className="flex justify-center gap-4 mb-4">
                <span className="text-3xl animate-flag-fly" style={{
                animationDelay: '0s'
              }}>🇳🇬</span>
                <span className="text-3xl animate-flag-fly" style={{
                animationDelay: '0.2s'
              }}>🇳🇬</span>
                <span className="text-3xl animate-flag-fly" style={{
                animationDelay: '0.4s'
              }}>🇳🇬</span>
              </div>
              
              <h2 className="text-white mb-6 text-balance">
                Ready to Blow? 🚀
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of Naija creators wey don level up their online game.
              </p>
              <Link to={user ? "/editor" : "/auth"}>
                <Button size="xl" className="bg-white text-naija-green hover:bg-white/95 rounded-full gap-3 shadow-2xl hover:shadow-white/20">
                  {user ? "Open Dashboard" : "Start for Free - No Charge!"}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-white/60 mt-4 flex items-center justify-center gap-2">
                100% free for Nigerians <span className="animate-flag-sparkle">🇳🇬</span> • Set up in 60 seconds
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* Nigerian stripe at top of footer */}
          <div className="naija-stripe-animated w-full max-w-md mx-auto mb-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Logo size="sm" showBadge={true} animated={false} />
            
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/install" className="hover:text-foreground transition-colors">Install</Link>
              <Link to="/auth" className="hover:text-foreground transition-colors">Login</Link>
            </div>

            {/* GitHub Credit */}
            <motion.a href="https://github.com/modesignedit" target="_blank" rel="noopener noreferrer" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-naija-green/50 shadow-lg hover:shadow-naija-green/10 transition-all group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-naija-green to-emerald-500 flex items-center justify-center">
                <Github className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Built with 💚 by</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-naija-light transition-colors">
                  @modesignedit
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.a>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Made with 💚 for Nigerian creators 
              <span className="inline-flex gap-1">
                <span className="animate-flag-fly" style={{
                animationDelay: '0s'
              }}>🇳🇬</span>
                <span className="animate-flag-fly" style={{
                animationDelay: '0.15s'
              }}>🇳🇬</span>
                <span className="animate-flag-fly" style={{
                animationDelay: '0.3s'
              }}>🇳🇬</span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;