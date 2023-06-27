import { Observable, Subject, tap } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskState } from '../states/task-state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  _isAddingNewTask$ = new Subject<boolean>();
  tasks$ = this.taskState.getTasks$();
  constructor(
    private readonly taskService: TaskService,
    private readonly taskState: TaskState
  ) {}
  saveNewTask(newTaskName: string): Observable<Task> {
    const newTask = new Task();
    newTask.name = newTaskName;
    this.addingNewTask();
    return this.taskService
      .saveNewTaskApi(newTask)
      .pipe(tap((task) => this.addNewTaskAction(task)));
  }

  isAddingNewTask$(): Observable<boolean> {
    return this._isAddingNewTask$.asObservable();
  }
  addingNewTask(): void {
    this._isAddingNewTask$.next(true);
  }
  cancelAddingNewTask() {
    this._isAddingNewTask$.next(false);
  }
  addNewTaskAction(task: Task): void {
    this.taskState.setTasks([task]);
    this.cancelAddingNewTask();
  }
}
