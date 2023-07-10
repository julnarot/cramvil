export interface ITaskResponse {
  id?: number;
  title?: string;
  description?: string;
  username?: string;
  checked?: boolean;
}

export class Task {
  id?: number;
  title!: string;
  description?: string;
  checked!: boolean;
}
