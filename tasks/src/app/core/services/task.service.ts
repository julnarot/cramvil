import { Injectable } from '@angular/core';
import { ITaskResponse, Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskAdapter } from '../adapters/task-adapter';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskUrl = `${environment.taskResource}/task`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly taskAdapter: TaskAdapter
  ) {}

  saveNewTaskApi(newTask: Task): Observable<Task> {
    return this.httpClient
      .post<ITaskResponse>(this.taskUrl, newTask)
      .pipe(map((task) => this.taskAdapter.adapt(task)));
  }
}
