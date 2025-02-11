import React from "react";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";

interface ProgressStatsProps {
  currentVolume?: number;
  goalVolume?: number;
}

const ProgressStats = ({
  currentVolume = 1200, // Default to 1200ml
  goalVolume = 2000, // Default to 2000ml daily goal
}: ProgressStatsProps) => {
  const progressPercentage = Math.min(
    Math.round((currentVolume / goalVolume) * 100),
    100,
  );

  return (
    <Card className="w-full max-w-[300px] p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Progress Today
          </span>
          <span className="font-semibold">{progressPercentage}%</span>
        </div>

        <Progress value={progressPercentage} className="h-2" />

        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {currentVolume}ml
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            of {goalVolume}ml
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressStats;
