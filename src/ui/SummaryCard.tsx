import React from "react";
import { useTodosStats } from "@hooks/todo/useTodoStats";

const StatusCard: React.FC = () => {
  const { total, completed } = useTodosStats();

  return (
    <div className="mt-20 bg-dark-card border border-dark-border rounded-xl p-4 sm:p-6 flex justify-between items-center animate-fade-in">
      <div className="text-left">
        <h2 className="text-2xl sm:text-4xl font-semibold mb-1 text-white">
          Task Done
        </h2>
        <h2 className="text-xl sm:text-3xl mb-1 text-white">Keep it up</h2>
      </div>

      <div className="w-24 h-24 sm:w-36 sm:h-36 bg-lime-green rounded-full flex items-center justify-center text-3xl sm:text-5xl text-white">
        <span>
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
