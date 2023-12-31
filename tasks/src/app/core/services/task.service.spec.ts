import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';
import { firstTaskResponseSpec } from '../spec-helpers/task-spec-helper';
import { TaskAdapter } from '../adapters/task-adapter';

describe('TaskService', () => {
  let service: TaskService;
  let adapter: TaskAdapter;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(TaskService);
    controller = TestBed.inject(HttpTestingController);
    adapter = TestBed.inject(TaskAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save taskApi', () => {
    let _task: Task = adapter.adapt(firstTaskResponseSpec);
    service.saveNewTaskApi(_task).subscribe((resultTask) => {
      expect(_task).toEqual(resultTask);
    });

    const request = controller.expectOne(environment.taskResource + '/task');
    request.flush(firstTaskResponseSpec);
    expect(request.request.method).toEqual('POST');
    controller.verify();
  });

  it('should be get tasksApi', () => {
    const tasksSpect = adapter.adaptArray([firstTaskResponseSpec]);
    service.getTasksApi().subscribe((tasks: Task[]) => {
      expect(tasksSpect.length).toEqual(tasks.length);
    });
    const request = controller.expectOne(environment.taskResource + '/task');
    request.flush([firstTaskResponseSpec]);
    expect(request.request.method).toEqual('GET');
    controller.verify();
  });
});
