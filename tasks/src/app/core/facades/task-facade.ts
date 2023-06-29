import { Observable, Subject, take, tap } from 'rxjs';
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
      .pipe(tap((taskSaved) => this.addNewTaskAction(taskSaved)));
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
  addNewTaskAction(taskSaved: Task) {
    this.tasks$
      .pipe(
        take(1),
        tap((_) => this.cancelAddingNewTask())
      )
      .subscribe((currentTaskList) => this.addTaskToList(taskSaved, currentTaskList));
  }

  private addTaskToList(task: Task, tasks: Task[]): void {
    this.taskState.setTasks([task, ...tasks]);
  }
}
