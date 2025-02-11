import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface WaterHistoryProps {
  history: Array<{
    date: string;
    intake: number;
    goal: number;
  }>;
}

const WaterHistory = ({ history = [] }: WaterHistoryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-accent">
        <h3 className="text-lg font-semibold">Water Intake History</h3>
        <ChevronRight
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <ScrollArea className="h-[calc(100vh-64px)] w-full border-t p-4">
          <div className="space-y-4">
            {history.map((record) => (
              <div
                key={record.date}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {format(new Date(record.date), "MMM dd, yyyy")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((record.intake / record.goal) * 100)}% of goal
                  </span>
                </div>
                <span className="text-right">
                  {record.intake}ml / {record.goal}ml
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WaterHistory;
