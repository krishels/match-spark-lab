import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MatchHeader from "@/components/MatchHeader";
import ProbabilityRing from "@/components/ProbabilityRing";
import TeamStatsPanel from "@/components/TeamStatsPanel";
import MomentumArc from "@/components/MomentumArc";
import CommunityPulse from "@/components/CommunityPulse";
import BettingOdds from "@/components/BettingOdds";
import ConfidenceScore from "@/components/ConfidenceScore";
import MatchAnalysisCards from "@/components/MatchAnalysisCards";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(true);
  const [aiPrediction, setAiPrediction] = useState<any>(null);
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

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setIsLoadingPrediction(true);
        
        const { data, error } = await supabase.functions.invoke("predict-match", {
          body: {
            homeTeam: matchData.homeTeam,
            awayTeam: matchData.awayTeam,
            homeStats: homeStats,
            awayStats: awayStats,
          },
        });

        if (error) throw error;

        if (data?.success && data?.prediction) {
          setAiPrediction(data.prediction);
        }
      } catch (error: any) {
        console.error("Error fetching prediction:", error);
        toast({
          title: "Prediction Error",
          description: error.message || "Failed to load AI prediction",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPrediction(false);
      }
    };

    fetchPrediction();
  }, []);

  const getPredictedTeam = () => {
    if (!aiPrediction) return matchData.homeTeam;
    if (aiPrediction.prediction === "home") return matchData.homeTeam;
    if (aiPrediction.prediction === "away") return matchData.awayTeam;
    return "Draw";
  };

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

          {isLoadingPrediction ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">AI analyzing match data...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Left Panel - Home Team */}
                <aside>
                  <TeamStatsPanel 
                    team={matchData.homeTeam}
                    {...homeStats}
                    position="left"
                  />
                </aside>

                {/* Center - Probability Ring and Confidence Score */}
                <section className="lg:col-span-1 space-y-6">
                  <ProbabilityRing 
                    homeWin={aiPrediction?.homeWinProbability || probabilities.homeWin}
                    draw={aiPrediction?.drawProbability || probabilities.draw}
                    awayWin={aiPrediction?.awayWinProbability || probabilities.awayWin}
                  />
                  <div className="flex justify-center">
                    <ConfidenceScore 
                      score={aiPrediction?.confidenceScore || 85}
                      prediction={aiPrediction?.prediction || "home"}
                      teamName={getPredictedTeam()}
                    />
                  </div>
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

              {/* AI Match Analysis */}
              {aiPrediction?.analysis && (
                <section>
                  <MatchAnalysisCards
                    homeTeam={matchData.homeTeam}
                    awayTeam={matchData.awayTeam}
                    homeAnalysis={aiPrediction.analysis.homeTeam}
                    awayAnalysis={aiPrediction.analysis.awayTeam}
                  />
                </section>
              )}
            </>
          )}

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
