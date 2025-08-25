import { BaseApi } from "@src/api/baseApi";
import { ITask } from "@src/types";
import { BASE_URL, API_ENDPOINTS } from "@src/config/constant";

export class TodoApi extends BaseApi {
  private readonly path = API_ENDPOINTS.TODOS;

  constructor() {
    super(BASE_URL);
  }

  async getTasks() {
    return this.get<ITask[]>(this.path);
  }

  async getTask(id: string) {
    return this.get<ITask>(`${this.path}/${id}`);
  }

  async createTask(text: string) {
    const task: Partial<ITask> = {
      text,
      isComplete: false,
      createdAt: new Date().toISOString(),
    };
    return this.post<ITask>(this.path, task);
  }

  async updateTask(id: string, data: Partial<ITask>) {
    return this.patch<ITask>(`${this.path}/${id}`, data);
  }

  async removeTask(id: string) {
    return this.delete(`${this.path}/${id}`);
  }
}
