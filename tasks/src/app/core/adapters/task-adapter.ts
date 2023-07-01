import { Injectable } from '@angular/core';
import { ITaskResponse, Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskAdapter {
  adapt = (input: ITaskResponse) =>
    Object.assign(new Task(), {
      id: input?.id,
      name: input?.name,
    });
  adaptArray = (tasks: ITaskResponse[]) =>
    tasks.map((itask) => this.adapt(itask));
}
