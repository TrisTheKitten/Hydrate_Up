import React from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface GoalSetterProps {
  currentGoal?: number;
  maxGoal?: number;
  onGoalChange?: (value: number) => void;
}

const GoalSetter = ({
  currentGoal = 2000,
  maxGoal = 4000,
  onGoalChange = () => {},
}: GoalSetterProps) => {
  return (
    <Card className="p-4 w-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="goal-slider" className="text-sm font-medium">
            Daily Water Goal
          </Label>
          <span className="text-sm text-muted-foreground">{currentGoal}ml</span>
        </div>

        <Slider
          id="goal-slider"
          min={0}
          max={maxGoal}
          step={100}
          value={[currentGoal]}
          onValueChange={(values) => onGoalChange(values[0])}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0ml</span>
          <span>{maxGoal}ml</span>
        </div>
      </div>
    </Card>
  );
};

export default GoalSetter;
