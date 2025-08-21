import { api, TODOS_PATH } from "@api/client";
import { ITask } from "@types";

const toTask = (doc: any): ITask => ({
  _id: doc._id,
  text: doc.text,
  isComplete: !!doc.isComplete,
  createdAt: doc.createdAt,
});

class TodoApi {
  private static _instance: TodoApi;
  static get instance() {
    if (!TodoApi._instance) {
      TodoApi._instance = new TodoApi();
    }
    return TodoApi._instance;
  }

  async fetchAll(): Promise<ITask[]> {
    const res = await api.get(TODOS_PATH);
    return (res.data || []).map(toTask);
  }

  async create(text: string): Promise<ITask> {
    const body = {
      text,
      isComplete: false,
      createdAt: new Date().toISOString(),
    };
    const res = await api.post(TODOS_PATH, body);
    return toTask(res.data);
  }

  async update(task: ITask): Promise<ITask> {
    if (!task._id) throw new Error("Missing _id for update");
    const { _id, ...withoutId } = task;
    await api.put(`${TODOS_PATH}/${_id}`, withoutId);
    return task;
  }

  async remove(task: ITask): Promise<void> {
    if (!task._id) throw new Error("Missing _id for delete");
    await api.delete(`${TODOS_PATH}/${task._id}`);
  }
}

export const todoApi = TodoApi.instance;
