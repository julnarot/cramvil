export interface ITaskResponse {
  id?: string;
  name?: string;
  checked?: string;
}

export class Task {
  id?: string;
  name!: string;
  status!: boolean;
  checked!: boolean;
}
