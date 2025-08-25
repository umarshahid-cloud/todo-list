import React from "react";
import { useTodosState } from "@src/hooks/todo/useTodoState";
import TaskItem from "@src/ui/TaskItem";
import { ITask } from "@src/types";

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
