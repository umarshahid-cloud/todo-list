import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.todos.tasks);

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
