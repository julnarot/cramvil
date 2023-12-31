import { Observable, take, tap } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskState } from '../states/task-state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  tasks$ = this.taskState.getTasks$();
  constructor(
    private readonly taskService: TaskService,
    private readonly taskState: TaskState
  ) {}

  refleshTasks(): void {
    this.taskService
      .getTasksApi()
      .subscribe((tasks) => this.taskState.setTasks(tasks));
  }

  saveNewTask(titleNewTask: string): Observable<Task> {
    const newTask = new Task();
    newTask.title = titleNewTask;
    return this.taskService
      .saveNewTaskApi(newTask)
      .pipe(tap((taskSaved) => this.addNewTaskAction(taskSaved)));
  }

  addNewTaskAction(taskSaved: Task): void {
    this.tasks$
      .pipe(take(1))
      .subscribe((currentTaskList) =>
        this.addTaskToList(taskSaved, currentTaskList)
      );
  }

  private addTaskToList(task: Task, tasks: Task[]): void {
    this.taskState.setTasks([task, ...tasks]);
  }
  removeTask(task: Task): void {
    this.tasks$
      .pipe(take(1))
      .subscribe((currentTaskList) =>
        this.taskState.setTasks(
          [...currentTaskList].filter((f) => f.id !== task.id)
        )
      );
  }
}
