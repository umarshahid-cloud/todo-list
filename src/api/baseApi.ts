import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

export class BaseApi<T> {
  constructor(private path: string) {}

  async getAll(): Promise<T[]> {
    const res = await api.get(this.path);
    return res.data;
  }

  async getOne(id: string): Promise<T> {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const res = await api.post(this.path, data);
    return res.data;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    ) as Partial<T>;
    const res = await api.patch(`${this.path}/${id}`, cleaned);
    return res.data;
  }

  async remove(id: string): Promise<void> {
    await api.delete(`${this.path}/${id}`);
  }
}
