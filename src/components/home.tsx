import React, { useState, useEffect } from "react";
import WaterBottle from "./WaterBottle";
import GoalSetter from "./GoalSetter";
import ProgressStats from "./ProgressStats";
import ActionButtons from "./ActionButtons";
import WaterHistory from "./WaterHistory";
import { ThemeToggle } from "./theme-toggle";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./auth/AuthProvider";
import { format, isToday, startOfDay } from "date-fns";

interface WaterRecord {
  date: string;
  intake: number;
  goal: number;
  user_id: string;
}

const Home = () => {
  const { user } = useAuth();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(2000);
  const [history, setHistory] = useState<WaterRecord[]>([]);

  // Load today's progress and history
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      // Get today's record if it exists
      const today = format(new Date(), "yyyy-MM-dd");
      const { data: todayData } = await supabase
        .from("water_intake")
        .select()
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (todayData) {
        setCurrentAmount(todayData.intake);
        setGoalAmount(todayData.goal);
      }

      // Load history
      const { data: historyData } = await supabase
        .from("water_intake")
        .select()
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (historyData) {
        setHistory(historyData);
      }
    };

    loadData();
  }, [user]);

  // Save progress when it changes
  useEffect(() => {
    if (!user) return;

    const saveProgress = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const { data: existing } = await supabase
        .from("water_intake")
        .select()
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (existing) {
        await supabase
          .from("water_intake")
          .update({ intake: currentAmount, goal: goalAmount })
          .eq("user_id", user.id)
          .eq("date", today);
      } else {
        await supabase.from("water_intake").insert({
          user_id: user.id,
          date: today,
          intake: currentAmount,
          goal: goalAmount,
        });
      }
    };

    saveProgress();
  }, [currentAmount, goalAmount, user]);

  const handleAddWater = () => {
    setCurrentAmount((prev) => Math.min(prev + 250, goalAmount));
  };

  const handleReset = () => {
    setCurrentAmount(0);
  };

  const handleGoalChange = (newGoal: number) => {
    setGoalAmount(newGoal);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col items-center justify-start gap-6 max-w-md mx-auto">
        <div className="w-full flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold">HydrateUp</h1>
          <ThemeToggle />
        </div>

        <WaterBottle
          currentAmount={currentAmount}
          goalAmount={goalAmount}
          onTap={handleAddWater}
        />

        <ProgressStats currentVolume={currentAmount} goalVolume={goalAmount} />

        <GoalSetter
          currentGoal={goalAmount}
          maxGoal={4000}
          onGoalChange={handleGoalChange}
        />

        <ActionButtons onReset={handleReset} onAddWater={handleAddWater} />
      </div>

      {/* Collapsible Sidebar */}
      <div className="w-80 border-l border-border">
        <WaterHistory history={history} />
      </div>
    </div>
  );
};

export default Home;
