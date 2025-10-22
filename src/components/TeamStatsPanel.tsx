import { motion } from "framer-motion";
import { TrendingUp, User, AlertCircle } from "lucide-react";

interface PlayerStat {
  name: string;
  goals?: number;
  assists?: number;
}

interface TeamStatsPanelProps {
  team: string;
  keyPlayers: PlayerStat[];
  injuryReport?: string;
  recentForm: number[];
  position?: "left" | "right";
}

const TeamStatsPanel = ({ team, keyPlayers, injuryReport, recentForm, position = "left" }: TeamStatsPanelProps) => {
  const maxHeight = Math.max(...recentForm);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 space-y-6"
    >
      <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
        <TrendingUp className={`w-5 h-5 ${position === "left" ? "text-primary" : "text-secondary"}`} />
        {team}
      </h3>
      
      {/* Key Player Stats */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">Key Player Stats:</p>
        {keyPlayers.map((player, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="flex items-start gap-3 glass-strong rounded-lg p-3"
          >
            <div className={`w-10 h-10 rounded-full ${position === "left" ? "bg-primary/20" : "bg-secondary/20"} flex items-center justify-center flex-shrink-0`}>
              <User className={`w-5 h-5 ${position === "left" ? "text-primary" : "text-secondary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{player.name}</p>
              <p className="text-sm text-muted-foreground">
                {player.goals !== undefined && `${player.goals} Goals`}
                {player.assists !== undefined && ` · ${player.assists} Assists`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Form */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">Form</p>
        <div className="flex items-end gap-2 h-20">
          {recentForm.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxHeight) * 100}%` }}
              transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
              className={`flex-1 rounded-t-lg ${
                position === "left" 
                  ? "bg-gradient-to-t from-primary/60 to-primary" 
                  : "bg-gradient-to-t from-secondary/60 to-secondary"
              }`}
              style={{ minHeight: "4px" }}
            />
          ))}
        </div>
      </div>
      
      {/* Injury Report */}
      {injuryReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="glass-strong rounded-lg p-3 flex items-start gap-2"
        >
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-destructive uppercase tracking-wider">Injury Report:</p>
            <p className="text-sm text-muted-foreground mt-1">{injuryReport}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeamStatsPanel;
