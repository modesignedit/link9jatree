import { motion } from "framer-motion";
import { Bitcoin, Wallet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WALLET_ADDRESSES = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  usdt: "0x742d35Cc6634C0532925a3b844Bc9e7595f3B7E8",
};

const SupportSection = () => {
  const copyToClipboard = (type: "btc" | "usdt") => {
    const address = WALLET_ADDRESSES[type];
    navigator.clipboard.writeText(address);
    toast.success(`${type.toUpperCase()} address copied!`, {
      description: `${address.slice(0, 20)}...${address.slice(-8)}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="w-full p-6 rounded-2xl glass border-2 border-white/10 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
      
      <div className="relative text-center mb-5">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Support My Work
          </h2>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Crypto tips are always appreciated!
        </p>
      </div>

      <div className="relative flex gap-3">
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={() => copyToClipboard("btc")}
            className="w-full h-14 bg-btc/10 border-btc/30 hover:bg-btc/20 hover:border-btc/50 hover:shadow-[0_0_30px_hsl(33_100%_50%/0.3)] text-btc transition-all duration-300 rounded-xl"
          >
            <Bitcoin className="w-5 h-5 mr-2" />
            Bitcoin
          </Button>
        </motion.div>
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={() => copyToClipboard("usdt")}
            className="w-full h-14 bg-usdt/10 border-usdt/30 hover:bg-usdt/20 hover:border-usdt/50 hover:shadow-[0_0_30px_hsl(168_76%_42%/0.3)] text-usdt transition-all duration-300 rounded-xl"
          >
            <Wallet className="w-5 h-5 mr-2" />
            USDT
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SupportSection;