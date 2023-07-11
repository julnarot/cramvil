import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { NbAuthModule } from '@nebular/auth';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot()],
      providers: [AuthInterceptor],
    });
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  xit('should be set token', () => {
    const specToken = 'aaabbbcccdddeee';
    //   token: 'fake-token'

    const next: HttpHandler = {
      handle: () => {
        return new Observable((subscriber: Subscriber<any>) => {
          subscriber.complete();
        });
      },
    };
    const requestMock = new HttpRequest(
      'GET',
      environment.taskResource + '/task'
    );

    spyOn(next, 'handle').and.callThrough();

    authInterceptor.intercept(requestMock, next).subscribe();

    expect(next.handle).toHaveBeenCalledWith(
      requestMock.clone({
        headers: requestMock.headers.append(
          'Authorization',
          `Bearer ${specToken}`
        ),
      })
    );
  });
});
