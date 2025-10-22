import { motion } from "framer-motion";
import { Shield, TrendingUp } from "lucide-react";

interface ConfidenceScoreProps {
  score: number;
  prediction: "home" | "draw" | "away";
  teamName?: string;
}

const ConfidenceScore = ({ score, prediction, teamName }: ConfidenceScoreProps) => {
  const getColorClass = () => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    return "text-secondary";
  };

  const getGlowClass = () => {
    if (score >= 80) return "glow-green";
    if (score >= 60) return "glow-cyan";
    return "glow-purple";
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className={`glass-strong rounded-3xl p-6 ${getGlowClass()} border-2`}>
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Shield className={`w-16 h-16 ${getColorClass()}`} />
          </motion.div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              AI Confidence Score
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-5xl font-black ${getColorClass()} text-glow-${score >= 80 ? 'green' : score >= 60 ? 'cyan' : 'purple'}`}
            >
              {score}%
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full h-2 bg-muted rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${
                score >= 80 
                  ? "from-accent to-accent/60"
                  : score >= 60 
                  ? "from-primary to-primary/60"
                  : "from-secondary to-secondary/60"
              }`}
            />
          </motion.div>

          {teamName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <TrendingUp className={`w-4 h-4 ${getColorClass()}`} />
              <span className="text-muted-foreground">Predicting:</span>
              <span className={`font-bold ${getColorClass()}`}>{teamName}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ConfidenceScore;
