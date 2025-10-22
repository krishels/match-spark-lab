import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface BettingOddsProps {
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}

const BettingOdds = ({ homeOdds, drawOdds, awayOdds }: BettingOddsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="glass rounded-2xl p-6 mt-8"
    >
      <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Betting Odds
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full h-auto flex flex-col gap-2 p-6 glass-strong border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Home Win</span>
            <span className="text-3xl font-black text-glow-cyan text-primary">{homeOdds.toFixed(2)}</span>
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full h-auto flex flex-col gap-2 p-6 glass-strong border-accent/50 hover:border-accent hover:bg-accent/10"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Draw</span>
            <span className="text-3xl font-black text-glow-green text-accent">{drawOdds.toFixed(2)}</span>
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full h-auto flex flex-col gap-2 p-6 glass-strong border-secondary/50 hover:border-secondary hover:bg-secondary/10"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Away Win</span>
            <span className="text-3xl font-black text-glow-purple text-secondary">{awayOdds.toFixed(2)}</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BettingOdds;
