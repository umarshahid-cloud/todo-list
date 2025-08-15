import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { RootState } from "../types";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;
