import { motion } from "framer-motion";
import { Bitcoin, Wallet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SupportSectionProps {
  btcAddress: string;
  usdtAddress: string;
}

const SupportSection = ({ btcAddress, usdtAddress }: SupportSectionProps) => {
  const copyToClipboard = (type: "btc" | "usdt") => {
    const address = type === "btc" ? btcAddress : usdtAddress;
    if (!address) {
      toast.error("No wallet address configured");
      return;
    }
    navigator.clipboard.writeText(address);
    toast.success(`${type.toUpperCase()} address copied!`, {
      description: `${address.slice(0, 20)}...${address.slice(-8)}`,
    });
  };

  if (!btcAddress && !usdtAddress) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="w-full p-6 rounded-2xl glass-strong gradient-border relative overflow-hidden"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/15 to-transparent rounded-full blur-2xl" />
      
      <div className="relative text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Support My Work
          </h2>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Crypto tips are always appreciated!
        </p>
      </div>

      <div className="relative flex gap-3">
        {btcAddress && (
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => copyToClipboard("btc")}
              className="w-full h-14 bg-btc/10 border-btc/30 hover:bg-btc/20 hover:border-btc/50 hover:shadow-[0_0_30px_hsl(33_100%_50%/0.4)] text-btc transition-all duration-300 rounded-xl group"
            >
              <Bitcoin className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Bitcoin</span>
            </Button>
          </motion.div>
        )}
        {usdtAddress && (
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => copyToClipboard("usdt")}
              className="w-full h-14 bg-usdt/10 border-usdt/30 hover:bg-usdt/20 hover:border-usdt/50 hover:shadow-[0_0_30px_hsl(168_76%_42%/0.4)] text-usdt transition-all duration-300 rounded-xl group"
            >
              <Wallet className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">USDT</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SupportSection;
