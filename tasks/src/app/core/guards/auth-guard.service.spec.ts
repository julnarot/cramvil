import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { NbAuthModule } from '@nebular/auth';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot()],
      providers: [],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
