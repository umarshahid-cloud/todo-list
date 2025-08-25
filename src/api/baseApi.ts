import axios, { AxiosInstance } from "axios";

export abstract class BaseApi {
  protected api: AxiosInstance;

  constructor(baseURL?: string) {
    this.api = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async get<T>(url: string): Promise<T> {
    const res = await this.api.get<T>(url);
    return res.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const res = await this.api.post<T>(url, data);
    return res.data;
  }

  async patch<T>(url: string, data: any): Promise<T> {
    const res = await this.api.patch<T>(url, data);
    return res.data;
  }

  async delete(url: string): Promise<void> {
    await this.api.delete(url);
  }
}
