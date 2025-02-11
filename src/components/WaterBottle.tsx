import React, { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaterBottleProps {
  currentAmount?: number;
  goalAmount?: number;
  onTap?: () => void;
}

const WaterBottle = ({
  currentAmount = 0,
  goalAmount = 2000,
  onTap = () => {},
}: WaterBottleProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const fillPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg">
      <motion.div
        className="relative cursor-pointer w-40 h-60"
        whileTap={{ scale: 0.95 }}
        onTapStart={() => setIsPressed(true)}
        onTapEnd={() => setIsPressed(false)}
        onClick={onTap}
      >
        {/* Bottle Container */}
        <div className="absolute inset-0 bg-gray-100 rounded-3xl border-2 border-gray-200 overflow-hidden">
          {/* Water Fill Animation */}
          <motion.div
            className="absolute bottom-0 w-full bg-blue-400/80 rounded-b-3xl"
            initial={{ height: "0%" }}
            animate={{ height: `${fillPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Water Ripple Effect */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 animate-wave"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  backgroundSize: "200% 200%",
                }}
              />
            </div>
          </motion.div>

          {/* Bottle Neck */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-gray-100 border-2 border-gray-200 rounded-t-lg" />
        </div>

        {/* Tap Indicator */}
        <motion.div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "text-blue-500 opacity-0",
          )}
          animate={{
            opacity: isPressed ? 1 : 0,
            scale: isPressed ? 1.2 : 1,
          }}
        >
          <Droplets size={48} />
        </motion.div>
      </motion.div>
      {/* Volume Indicator */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          {currentAmount}ml / {goalAmount}ml
        </p>
      </div>
    </div>
  );
};

export default WaterBottle;
