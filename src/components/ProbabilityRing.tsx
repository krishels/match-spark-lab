import { motion } from "framer-motion";
import stadiumBg from "@/assets/stadium-bg.jpg";

interface ProbabilityRingProps {
  homeWin: number;
  draw: number;
  awayWin: number;
}

const ProbabilityRing = ({ homeWin, draw, awayWin }: ProbabilityRingProps) => {
  const total = homeWin + draw + awayWin;
  const homePercent = (homeWin / total) * 100;
  const drawPercent = (draw / total) * 100;
  const awayPercent = (awayWin / total) * 100;
  
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  
  const homeOffset = 0;
  const drawOffset = (homePercent / 100) * circumference;
  const awayOffset = ((homePercent + drawPercent) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center py-12">
      <div className="relative w-full max-w-md aspect-square">
        {/* Background stadium image */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <img 
            src={stadiumBg} 
            alt="Stadium" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* SVG Rings */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 320 320">
          {/* Background ring */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="32"
            opacity="0.2"
          />
          
          {/* Home win arc */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="32"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (homePercent / 100) * circumference}
            strokeLinecap="round"
            className="glow-cyan"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (homePercent / 100) * circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Draw arc */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="32"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - drawOffset - (drawPercent / 100) * circumference}
            strokeLinecap="round"
            className="glow-green"
            style={{ 
              transform: `rotate(${(homePercent / 100) * 360}deg)`,
              transformOrigin: "center"
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (drawPercent / 100) * circumference }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          />
          
          {/* Away win arc */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="32"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - awayOffset - (awayPercent / 100) * circumference}
            strokeLinecap="round"
            className="glow-purple"
            style={{ 
              transform: `rotate(${((homePercent + drawPercent) / 100) * 360}deg)`,
              transformOrigin: "center"
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (awayPercent / 100) * circumference }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="glass-strong rounded-full p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <p className="text-5xl font-black text-glow-cyan text-primary mb-2">
                {homePercent.toFixed(0)}%
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Home Win</p>
            </motion.div>
          </div>
        </div>
        
        {/* Labels around the ring */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Draw</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-2xl font-bold text-glow-purple text-secondary">{awayPercent.toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Away Win</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProbabilityRing;
