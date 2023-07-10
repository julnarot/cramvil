import { TestBed } from '@angular/core/testing';
import { TaskFacade } from './task-facade';
import { NbAuthModule } from '@nebular/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskAdapter } from '../adapters/task-adapter';
import { firstTaskResponseSpec } from '../spec-helpers/task-spec-helper';
import { Task } from '../models/task';
import { of } from 'rxjs';
import { TaskService } from '../services/task.service';

describe('TaskFacade', () => {
  let facade: TaskFacade;
  let adapter: TaskAdapter;
  let task: Task;
  let facadeSpy = jasmine.createSpyObj('TaskFacade', {
    saveNewTask: of(),
    addNewTaskAction: undefined,
    refleshTasks: undefined,
  });

  let serviceSpy = jasmine.createSpyObj('TaskService', ['getTasksApi']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: TaskFacade, useValue: facadeSpy },
        { provide: TaskService, useValue: serviceSpy },
      ],
    });
    facade = TestBed.inject(TaskFacade);
    adapter = TestBed.inject(TaskAdapter);
    task = adapter.adapt(firstTaskResponseSpec);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should be saved task', () => {
    facade.saveNewTask(task.name).subscribe((resultTask) => {
      expect(resultTask).toEqual(task);
      expect(facadeSpy.addNewTaskAction).toHaveBeenCalled();
    });
  });

  it('should be refleshTasks', () => {
    facade.refleshTasks();
    expect(serviceSpy.getTasksApi).toHaveBeenCalled();
  });
});
