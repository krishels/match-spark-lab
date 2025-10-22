import { motion } from "framer-motion";
import teamHome from "@/assets/team-home.png";
import teamAway from "@/assets/team-away.png";

interface MatchHeaderProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  league: string;
  date: string;
}

const MatchHeader = ({ homeTeam, awayTeam, homeScore, awayScore, league, date }: MatchHeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 relative"
    >
      <div className="flex items-center justify-center gap-8 mb-6">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <img 
            src={teamHome} 
            alt={homeTeam}
            className="w-24 h-24 object-contain glow-cyan animate-float"
          />
        </motion.div>
        
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {homeTeam} <span className="text-muted-foreground">vs.</span> {awayTeam}
          </h1>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl md:text-8xl font-black tracking-wider"
          >
            <span className="text-glow-cyan text-primary">{homeScore}</span>
            <span className="text-muted-foreground mx-4">-</span>
            <span className="text-glow-purple text-secondary">{awayScore}</span>
          </motion.div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <img 
            src={teamAway} 
            alt={awayTeam}
            className="w-24 h-24 object-contain glow-purple animate-float"
            style={{ animationDelay: "1s" }}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-sm md:text-base"
      >
        <p>{league} - {date}</p>
      </motion.div>
    </motion.header>
  );
};

export default MatchHeader;
