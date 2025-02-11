import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onReset?: () => void;
  onAddWater?: () => void;
}

const ActionButtons = ({
  onReset = () => {},
  onAddWater = () => {},
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 bg-background">
      <Button size="lg" className="w-full text-lg" onClick={onAddWater}>
        Add Water
      </Button>

      <AlertDialog defaultOpen={false}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="lg" className="w-full text-lg">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset Progress
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset your water intake progress for
              today? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
