import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private readonly httpClient: HttpClient) {}
  saveNewTaskApi(newTask: Task): Observable<Task> {
    // return this.httpClient.post<Task>('', newTask);
    return of(newTask);
  }
}
