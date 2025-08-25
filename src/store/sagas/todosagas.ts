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
} from "@src/store/reducers/todoReducer";
import { ITask } from "@src/types";
import { TodoApi } from "@src/api/TodoApi";
import { toast } from "react-toastify";

const todoApi = new TodoApi();

const pickById = (state: { todos: { tasks: ITask[] } }, id: string) =>
  state.todos.tasks.find((t) => t._id === id);

function* handleFetchTodos() {
  try {
    const items: ITask[] = yield call([todoApi, todoApi.getTasks]);

    yield put(fetchTodosSuccess(items));

    if (items.length === 0) {
      toast.info("No todos yet 📭");
    } else {
      toast.success("Todos loaded ✅");
    }
  } catch (e: any) {
    yield put(fetchTodosFailure(e?.message ?? "Failed to load"));
    toast.error("Failed to load todos ❌");
  }
}

function* handleAddTodo(action: ReturnType<typeof addTaskRequest>) {
  try {
    const task: ITask = yield call(
      [todoApi, todoApi.createTask],
      action.payload
    );
    yield put(addTaskSuccess(task));
    toast.success("Task added 🎉");
  } catch (e: any) {
    yield put(addTaskFailure(e?.message ?? "Failed to add"));
    toast.error("Failed to add task ❌");
  }
}

function* handleToggleTodo(action: ReturnType<typeof toggleTaskRequest>) {
  try {
    const id = action.payload;
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");

    const updated: ITask = { ...task, isComplete: !task.isComplete };

    const { _id, ...body } = updated;
    yield call([todoApi, todoApi.updateTask], _id, body);

    yield put(toggleTaskSuccess(updated));
    toast.success(
      updated.isComplete ? "Task completed ✅" : "Task Marked as incomplete ✏️"
    );
  } catch (e: any) {
    yield put(toggleTaskFailure(e?.message ?? "Failed to toggle"));
    toast.error("Failed to update task ❌");
  }
}

function* handleEditTodo(action: ReturnType<typeof editTaskRequest>) {
  try {
    const { id, text } = action.payload;
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");

    const updated: ITask = { ...task, text };

    const { _id, ...body } = updated;
    yield call([todoApi, todoApi.updateTask], _id, body);

    yield put(editTaskSuccess(updated));
    toast.success("Task edited ✏️");
  } catch (e: any) {
    yield put(editTaskFailure(e?.message ?? "Failed to edit"));
    toast.error("Failed to edit task ❌");
  }
}

function* handleDeleteTodo(action: ReturnType<typeof deleteTaskRequest>) {
  try {
    const id = action.payload; // _id string
    const task: ITask | undefined = yield select(pickById, id);
    if (!task) throw new Error("Task not found");

    yield call([todoApi, todoApi.removeTask], task._id);
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
