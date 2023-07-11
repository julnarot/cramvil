import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, iif, map, switchMap } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: NbAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.isAuthenticated().pipe(
      switchMap((authenticated) =>
        iif(
          () => authenticated,
          this.authService.getToken().pipe(
            map((token: any) => token.token['access_token']),
            switchMap((t) => {
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${t}`,
                },
              });
              return next.handle(newRequest);
            })
          ),
          next.handle(request)
        )
      )
    );
  }
}
