import React from "react";
import { useTodosState } from "@hooks/todo/useTodoState";
import TaskItem from "@ui/TaskItem";
import { ITask } from "@types";

const TaskList: React.FC = () => {
  const { tasks } = useTodosState();

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task: ITask) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
