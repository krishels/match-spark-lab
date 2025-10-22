import { motion } from "framer-motion";
import { Swords, Shield, Zap, Target, Activity, Brain } from "lucide-react";

interface AnalysisMetric {
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue: number;
}

interface MatchAnalysisCardsProps {
  homeTeam: string;
  awayTeam: string;
  homeAnalysis: {
    attackProwess: number;
    formStreak: number;
    defensiveStrength: number;
  };
  awayAnalysis: {
    tacticalEdge: number;
    midfieldControl: number;
    formStreak: number;
  };
}

const MatchAnalysisCards = ({ 
  homeTeam, 
  awayTeam, 
  homeAnalysis, 
  awayAnalysis 
}: MatchAnalysisCardsProps) => {
  const homeMetrics: AnalysisMetric[] = [
    {
      icon: <Swords className="w-6 h-6" />,
      label: "Attack Prowess",
      value: homeAnalysis.attackProwess,
      maxValue: 10
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Form Streak",
      value: homeAnalysis.formStreak,
      maxValue: 10
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Defense",
      value: homeAnalysis.defensiveStrength,
      maxValue: 10
    }
  ];

  const awayMetrics: AnalysisMetric[] = [
    {
      icon: <Brain className="w-6 h-6" />,
      label: "Tactical Edge",
      value: awayAnalysis.tacticalEdge,
      maxValue: 10
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Midfield Control",
      value: awayAnalysis.midfieldControl,
      maxValue: 10
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Form Streak",
      value: awayAnalysis.formStreak,
      maxValue: 10
    }
  ];

  const MetricCard = ({ metric, color, index }: { metric: AnalysisMetric; color: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="glass-strong rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-3 ${color}`}>
          <div className="w-10 h-10 rounded-lg bg-current/20 flex items-center justify-center">
            {metric.icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-xl font-bold">{metric.value.toFixed(1)}</p>
          </div>
        </div>
      </div>
      
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${
            color === "text-primary" ? "bg-primary" : "bg-secondary"
          }`}
        />
      </div>
      
      <div className="flex gap-1">
        {Array.from({ length: metric.maxValue }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: i < Math.round(metric.value) ? 1 : 0.2,
              scale: 1 
            }}
            transition={{ delay: 0.8 + index * 0.05 + i * 0.02 }}
            className={`w-2 h-2 rounded-full ${
              i < Math.round(metric.value)
                ? color === "text-primary" ? "bg-primary" : "bg-secondary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2"
      >
        <Zap className="w-5 h-5 text-accent" />
        AI Match Analysis
      </motion.h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Team Analysis */}
        <div className="space-y-4">
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base font-semibold text-primary flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
            {homeTeam} Outlook
          </motion.h4>
          <div className="space-y-3">
            {homeMetrics.map((metric, idx) => (
              <MetricCard key={idx} metric={metric} color="text-primary" index={idx} />
            ))}
          </div>
        </div>

        {/* Away Team Analysis */}
        <div className="space-y-4">
          <motion.h4
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base font-semibold text-secondary flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            {awayTeam} Outlook
          </motion.h4>
          <div className="space-y-3">
            {awayMetrics.map((metric, idx) => (
              <MetricCard key={idx} metric={metric} color="text-secondary" index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalysisCards;
