import { useMemo } from "react";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { ITask } from "@src/types";

export function useTodos() {
  const tasks = useAppSelector((s) => s.todos.tasks as ITask[]);
  const loading = useAppSelector((s) => s.todos.loading);
  const error = useAppSelector((s) => s.todos.error);

  const { total, completed, active } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isComplete).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  return { tasks, loading, error, total, completed, active };
}
