import { useAppSelector } from "@src/hooks/useAppSelector";
import { ITask } from "@src/types";

export function useTodosState() {
  const tasks = useAppSelector((s) => s.todos.tasks as ITask[]);
  const loading = useAppSelector((s) => s.todos.loading);
  const error = useAppSelector((s) => s.todos.error);
  return { tasks, loading, error };
}

export function useTaskById(id: string) {
  return useAppSelector((s) => s.todos.tasks.find((t: ITask) => t._id === id));
}
