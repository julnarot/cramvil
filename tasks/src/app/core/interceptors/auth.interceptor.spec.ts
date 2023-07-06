import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { NbAuthModule } from '@nebular/auth';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [NbAuthModule.forRoot()],
    providers: [
      AuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
