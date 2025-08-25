import { useCallback } from "react";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import {
  fetchTodosRequest,
  addTaskRequest,
  toggleTaskRequest,
  deleteTaskRequest,
  editTaskRequest,
} from "@src/store/reducers/todoReducer";

export function useTodosActions() {
  const dispatch = useAppDispatch();

  const fetchTodos = useCallback(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const addTask = useCallback(
    (text: string) => {
      dispatch(addTaskRequest(text));
    },
    [dispatch]
  );

  const toggleTask = useCallback(
    (id: string) => {
      dispatch(toggleTaskRequest(id));
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTaskRequest(id));
    },
    [dispatch]
  );

  const editTask = useCallback(
    (id: string, text: string) => {
      dispatch(editTaskRequest({ id, text }));
    },
    [dispatch]
  );

  return { fetchTodos, addTask, toggleTask, deleteTask, editTask };
}
