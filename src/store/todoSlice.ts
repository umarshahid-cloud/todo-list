import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState, Task } from "../types";

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.text = text;
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;
