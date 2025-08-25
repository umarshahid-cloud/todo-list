import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ITask, ITodoState } from "@src/types";

const initialState: ITodoState = {
  tasks: [],
  loading: false,
  error: null,
};

// --- Matchers for all todos actions
const isTodosAction = (a: Action) => a.type.startsWith("todos/");
const isRequest = (a: Action) => isTodosAction(a) && a.type.endsWith("Request");
const isSuccess = (a: Action) => isTodosAction(a) && a.type.endsWith("Success");
const isFailure = (a: Action) => isTodosAction(a) && a.type.endsWith("Failure");

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ---- Request creators (sagas listen for these)
    fetchTodosRequest() {},
    addTaskRequest(_state, _action: PayloadAction<string>) {},
    toggleTaskRequest(_state, _action: PayloadAction<string>) {},
    editTaskRequest(
      _state,
      _action: PayloadAction<{ id: string; text: string }>
    ) {},
    deleteTaskRequest(_state, _action: PayloadAction<string>) {},

    // ---- Success / Failure that actually change state
    fetchTodosSuccess(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
    fetchTodosFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    addTaskSuccess(state, action: PayloadAction<ITask>) {
      state.tasks.unshift(action.payload);
    },
    addTaskFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    toggleTaskSuccess(state, action: PayloadAction<ITask>) {
      const t = action.payload;
      state.tasks = state.tasks.map((x) => (x._id === t._id ? t : x));
    },
    toggleTaskFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    editTaskSuccess(state, action: PayloadAction<ITask>) {
      const t = action.payload;
      state.tasks = state.tasks.map((x) => (x._id === t._id ? t : x));
    },
    editTaskFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    deleteTaskSuccess(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((x) => x._id !== action.payload);
    },
    deleteTaskFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRequest, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addMatcher(isSuccess, (state) => {
      state.loading = false;
    });

    builder.addMatcher(isFailure, (state, action: Action) => {
      state.loading = false;
      state.error =
        typeof (action as any).payload === "string"
          ? (action as any).payload
          : "Operation failed";
    });
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  toggleTaskRequest,
  toggleTaskSuccess,
  toggleTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = todoSlice.actions;

export default todoSlice.reducer;
