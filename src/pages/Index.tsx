import { Helmet } from "react-helmet";
import MatchHeader from "@/components/MatchHeader";
import ProbabilityRing from "@/components/ProbabilityRing";
import TeamStatsPanel from "@/components/TeamStatsPanel";
import MomentumArc from "@/components/MomentumArc";
import CommunityPulse from "@/components/CommunityPulse";
import BettingOdds from "@/components/BettingOdds";

const Index = () => {
  // Sample data for demonstration
  const matchData = {
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 2,
    awayScore: 1,
    league: "La Liga Santander",
    date: "24/10/2023",
  };

  const probabilities = {
    homeWin: 60,
    draw: 15,
    awayWin: 25,
  };

  const homeStats = {
    keyPlayers: [
      { name: "Benzema", goals: 12, assists: 7 },
      { name: "Modrić", goals: 3, assists: 8 },
    ],
    recentForm: [8, 6, 9, 7, 8],
  };

  const awayStats = {
    keyPlayers: [
      { name: "Lewandowski", goals: 10, assists: 4 },
      { name: "Pedri", goals: 2, assists: 6 },
    ],
    injuryReport: "F. De Jong (Hamstring)",
    recentForm: [7, 5, 8, 6, 7],
  };

  const momentumEvents = [
    { minute: 15, type: "goal" as const, team: "home" as const },
    { minute: 30, type: "chance" as const, team: "away" as const },
    { minute: 67, type: "goal" as const, team: "home" as const },
    { minute: 83, type: "goal" as const, team: "away" as const },
  ];

  return (
    <>
      <Helmet>
        <title>Real Madrid vs Barcelona - Match Prediction & Odds | Match Predictor</title>
        <meta name="description" content="AI-powered match prediction for Real Madrid vs Barcelona. View live odds, team statistics, player performance data, and betting insights." />
        <link rel="canonical" href="https://yoursite.com/match/real-madrid-vs-barcelona" />
      </Helmet>

      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <MatchHeader {...matchData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Panel - Home Team */}
            <aside>
              <TeamStatsPanel 
                team={matchData.homeTeam}
                {...homeStats}
                position="left"
              />
            </aside>

            {/* Center - Probability Ring */}
            <section className="lg:col-span-1">
              <ProbabilityRing {...probabilities} />
            </section>

            {/* Right Panel - Away Team */}
            <aside>
              <TeamStatsPanel 
                team={matchData.awayTeam}
                {...awayStats}
                position="right"
              />
            </aside>
          </div>

          {/* Momentum Arc */}
          <section>
            <MomentumArc events={momentumEvents} />
          </section>

          {/* Community Pulse */}
          <section>
            <CommunityPulse 
              sentiment="MIDFIELD"
              tags={["Attack", "2Draw", "Tick", "Chance 59'", "Montuck Battle", "Tactics"]}
            />
          </section>

          {/* Betting Odds */}
          <section>
            <BettingOdds 
              homeOdds={1.85}
              drawOdds={3.50}
              awayOdds={4.20}
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
