import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../models/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskState {
  private readonly _task$: Subject<Task> = new Subject<Task>();
  private readonly _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  setTask(task: Task): void {
    this._task$.next(task);
  }
  getTask$(): Observable<Task> {
    return this._task$.asObservable();
  }
  setTasks(tasks: Task[]): void {
    this._tasks$.next(tasks);
  }
  getTasks$(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }
}
