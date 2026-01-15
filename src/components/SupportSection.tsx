import { motion } from "framer-motion";
import { Bitcoin, Wallet } from "lucide-react";
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
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full p-6 rounded-2xl glass border-2 border-white/10"
    >
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground mb-1">
          Support My Work ☕
        </h2>
        <p className="text-sm text-muted-foreground">
          Crypto tips are always appreciated!
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => copyToClipboard("btc")}
          className="flex-1 h-12 bg-btc/10 border-btc/30 hover:bg-btc/20 hover:border-btc/50 text-btc transition-all"
        >
          <Bitcoin className="w-5 h-5 mr-2" />
          BTC
        </Button>
        <Button
          variant="outline"
          onClick={() => copyToClipboard("usdt")}
          className="flex-1 h-12 bg-usdt/10 border-usdt/30 hover:bg-usdt/20 hover:border-usdt/50 text-usdt transition-all"
        >
          <Wallet className="w-5 h-5 mr-2" />
          USDT
        </Button>
      </div>
    </motion.div>
  );
};

export default SupportSection;