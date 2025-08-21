import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_CRUDCRUD_BASE,
  headers: { "Content-Type": "application/json" },
});

export const TODOS_PATH = "/todos";
