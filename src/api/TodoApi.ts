// src/api/todoApi.ts
import { BaseApi } from "./baseApi";
import { ITask } from "@src/types";

class TodoApi extends BaseApi<ITask> {
  private static _instance: TodoApi;

  private constructor() {
    super("/todos");
  }

  static get instance() {
    if (!this._instance) this._instance = new TodoApi();
    return this._instance;
  }

  async createTask(text: string) {
    return this.create({
      text,
      isComplete: false,
      createdAt: new Date().toISOString(),
    });
  }
}

export const todoApi = TodoApi.instance;
