import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { RootState, TodoState } from "../types";

const defaultTodoState: TodoState = {
  tasks: [],
};

function loadState(): RootState {
  try {
    const serializedState = localStorage.getItem("todoState");
    if (!serializedState) {
      return { todos: defaultTodoState };
    }
    return { todos: JSON.parse(serializedState) as TodoState };
  } catch (e) {
    console.warn("Load state error", e);
    return { todos: defaultTodoState };
  }
}

function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem("todoState", serializedState);
  } catch (e) {
    console.warn("Save state error", e);
  }
}

const preloadedState: RootState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;
