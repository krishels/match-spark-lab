import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

interface MomentumEvent {
  minute: number;
  type: "goal" | "chance";
  team: "home" | "away";
}

interface MomentumArcProps {
  events: MomentumEvent[];
}

const MomentumArc = ({ events }: MomentumArcProps) => {
  const pathData = "M 0 60 Q 100 20, 200 40 T 400 50 T 600 60 T 800 55 T 1000 60";
  
  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-accent" />
        Momentum Arc
      </h3>
      
      <div className="relative h-32 w-full overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
          {/* Background grid */}
          <defs>
            <linearGradient id="momentumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
          
          {/* Momentum line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#momentumGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="glow-cyan"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Event markers */}
          {events.map((event, idx) => (
            <motion.g
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.2 }}
            >
              <circle
                cx={(event.minute / 90) * 1000}
                cy={event.type === "goal" ? 30 : 50}
                r="8"
                fill={event.team === "home" ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                className={event.team === "home" ? "glow-cyan" : "glow-purple"}
              />
            </motion.g>
          ))}
        </svg>
        
        {/* Time labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
          {events.slice(0, 2).map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + idx * 0.2 }}
              className="flex items-center gap-1"
            >
              <Clock className="w-3 h-3" />
              <span>{event.type === "goal" ? `Goal ${event.minute}'` : `Chance ${event.minute}'`}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MomentumArc;
