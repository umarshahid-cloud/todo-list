import React from "react";
import { useTodos } from "../hooks/useTodos";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks } = useTodos();

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
