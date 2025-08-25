import { useMemo } from "react";
import { ITask } from "@src/types";
import { useTodosState } from "@src/hooks/todo/useTodoState";

export function useTodosStats() {
  const { tasks } = useTodosState();
  return useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t: ITask) => t.isComplete).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);
}
