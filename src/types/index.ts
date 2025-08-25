export interface ITask {
  _id: string;
  text: string;
  isComplete: boolean;
  createdAt?: string;
}

export interface ITodoState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

export interface IIconProps {
  size?: number;
  color?: string;
}
