import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const StatusCard: React.FC = () => {
  const tasks = useAppSelector((state) => state.todos.tasks);
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="mt-24 bg-dark-card border border-dark-border rounded-xl p-6 flex justify-between items-center animate-fade-in">
      <div className="text-left">
        <h2 className="text-4xl font-semibold mb-1 text-white">Task Done</h2>
        <h2 className="text-3xl mb-1 text-white">Keep it up</h2>
      </div>
      <div className="w-36 h-36 bg-lime-green rounded-full flex items-center justify-center text-5xl text-white">
        <span>
          {completedTasks}/{totalTasks}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
