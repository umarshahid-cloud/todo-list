export interface Task {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface TodoState {
  tasks: Task[];
}

export interface RootState {
  todos: TodoState;
}
