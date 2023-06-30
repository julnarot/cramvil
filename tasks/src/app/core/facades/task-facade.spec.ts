import { TestBed } from '@angular/core/testing';
import { TaskFacade } from './task-facade';
import { NbAuthModule } from '@nebular/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskFacade', () => {
  let facade: TaskFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), HttpClientTestingModule],
    });
    facade = TestBed.inject(TaskFacade);
  });
  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
