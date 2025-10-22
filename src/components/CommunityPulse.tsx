import { motion } from "framer-motion";
import { MessageSquare, Target, TrendingUp } from "lucide-react";

interface CommunityPulseProps {
  sentiment: string;
  tags: string[];
}

const CommunityPulse = ({ sentiment, tags }: CommunityPulseProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glass rounded-2xl p-6 mt-8"
    >
      <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-accent" />
        Community Pulse
      </h3>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-strong rounded-full px-6 py-3 text-center"
        >
          <p className="text-3xl font-black text-glow-green text-accent">{sentiment}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sentiment</p>
        </motion.div>
        
        <div className="flex-1 flex flex-wrap gap-2 justify-center">
          {tags.map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="glass-strong rounded-full px-4 py-2 text-sm font-semibold cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPulse;
