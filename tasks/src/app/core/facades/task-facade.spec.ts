import { TestBed } from '@angular/core/testing';
import { TaskFacade } from './task-facade';
import { NbAuthModule } from '@nebular/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskAdapter } from '../adapters/task-adapter';
import { firstTaskResponseSpec } from '../spec-helpers/task-spec-helper';

describe('TaskFacade', () => {
  let facade: TaskFacade;
  let adapter: TaskAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), HttpClientTestingModule],
    });
    facade = TestBed.inject(TaskFacade);
    adapter = TestBed.inject(TaskAdapter);
  });
  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
  it('should be saved task', () => {
    let _task = adapter.adapt(firstTaskResponseSpec);
    facade.saveNewTask(_task.name).subscribe((resultTask) => {
      expect(resultTask).toEqual(_task);
    });
  });
});
