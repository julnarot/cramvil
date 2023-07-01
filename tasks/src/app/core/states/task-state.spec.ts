import { TestBed } from '@angular/core/testing';
import { TaskState } from './task-state';
import { firstTaskResponseSpec } from '../spec-helpers/task-spec-helper';
import { TaskAdapter } from '../adapters/task-adapter';

describe('TaskState', () => {
  let state: TaskState;
  let adapter: TaskAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(TaskState);
    adapter = TestBed.inject(TaskAdapter);
  });
  it('should be created', () => {
    expect(state).toBeTruthy();
  });

  it('should be set and get task', () => {
    const expectTask = adapter.adapt(firstTaskResponseSpec);
    state.setTask(expectTask);
    state.getTask$().subscribe((task) => {
      expect(task).toEqual(expectTask);
    });
  });

  it('should be set and get list task', () => {
    const expectTasks = adapter.adaptArray([firstTaskResponseSpec]);
    state.setTasks(expectTasks);
    state.getTasks$().subscribe((tasks) => {
      expect(tasks.length).toEqual(expectTasks.length);
      expect(tasks[0]).toEqual(expectTasks[0]);
    });
  });
});
