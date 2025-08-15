export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  tasks: Task[];
}

export interface RootState {
  todos: TodoState;
}
