// src/features/todo/useTodos.ts
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
} from "../store/slices/todoSlice";

export function useTodos() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((s) => s.todos.tasks);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isComplete).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  const create = useCallback(
    (text: string) => {
      dispatch(addTask(text));
    },
    [dispatch]
  );

  const toggle = useCallback(
    (id: number) => {
      dispatch(toggleTask(id));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: number) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const update = useCallback(
    (id: number, text: string) => {
      dispatch(editTask({ id, text }));
    },
    [dispatch]
  );

  return {
    tasks,
    stats,
    addTask: create,
    toggleTask: toggle,
    deleteTask: remove,
    editTask: update,
  };
}
