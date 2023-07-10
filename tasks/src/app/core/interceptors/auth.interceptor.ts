import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: NbAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.getToken().pipe(
      map((token: any) => token.token['access_token']),
      switchMap((token) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(newRequest);
      })
    );
  }
}
