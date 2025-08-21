import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
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
} from "@store/reducers/todoReducer";
import { ITask } from "@types";
import { todoApi } from "@api/TodoApi";
import { toast } from "react-toastify";

// find by backend id (_id is a string)
const pickById = (state: { todos: { tasks: ITask[] } }, id: string) =>
  state.todos.tasks.find((t) => t._id === id);

function* handleFetchTodos() {
  try {
    const items: ITask[] = yield call([todoApi, todoApi.fetchAll]);

    const sorted = [...items].sort(
      (a, b) =>
        (Date.parse(b.createdAt || "") || 0) -
        (Date.parse(a.createdAt || "") || 0)
    );

    yield put(fetchTodosSuccess(sorted));

    // Different toast if no todos
    if (sorted.length === 0) {
      toast.info("No todos yet for today 📭");
    } else {
      toast.success("Todos loaded successfully ✅");
    }
  } catch (e: any) {
    yield put(fetchTodosFailure(e?.message ?? "Failed to load"));
    toast.error("Failed to load todos ❌");
  }
}

function* handleAddTodo(action: ReturnType<typeof addTaskRequest>) {
  try {
    const task: ITask = yield call([todoApi, todoApi.create], action.payload);
    yield put(addTaskSuccess(task));
    toast.success("Task added 🎉");
  } catch (e: any) {
    yield put(addTaskFailure(e?.message ?? "Failed to add"));
    toast.error("Failed to add task ❌");
  }
}

function* handleToggleTodo(action: ReturnType<typeof toggleTaskRequest>) {
  try {
    const id = action.payload; // _id: string
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");

    // Flip completion
    const updated: ITask = { ...task, isComplete: !task.isComplete };

    // Update in backend
    yield call([todoApi, todoApi.update], updated);

    // Update in store
    yield put(toggleTaskSuccess(updated));

    if (updated.isComplete) {
      toast.success("Task completed ✅");
    } else {
      toast.info("Task marked as incomplete ✏️");
    }
  } catch (e: any) {
    yield put(toggleTaskFailure(e?.message ?? "Failed to toggle"));
    toast.error("Failed to update task ❌");
  }
}

function* handleEditTodo(action: ReturnType<typeof editTaskRequest>) {
  try {
    const { id, text } = action.payload; // id = _id string
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");
    const updated: ITask = { ...task, text };
    yield call([todoApi, todoApi.update], updated);
    yield put(editTaskSuccess(updated));
    toast.success("Task Edited ✏️");
  } catch (e: any) {
    yield put(editTaskFailure(e?.message ?? "Failed to edit"));
    toast.error("Failed to update task ❌");
  }
}

function* handleDeleteTodo(action: ReturnType<typeof deleteTaskRequest>) {
  try {
    const id = action.payload; // _id string
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");
    yield call([todoApi, todoApi.remove], task);
    yield put(deleteTaskSuccess(id));
    toast.success("Task deleted 🗑️");
  } catch (e: any) {
    yield put(deleteTaskFailure(e?.message ?? "Failed to delete"));
    toast.error("Failed to delete task ❌");
  }
}

export function* todoRootSaga() {
  yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
  yield takeEvery(addTaskRequest.type, handleAddTodo);
  yield takeEvery(toggleTaskRequest.type, handleToggleTodo);
  yield takeEvery(editTaskRequest.type, handleEditTodo);
  yield takeEvery(deleteTaskRequest.type, handleDeleteTodo);
}
