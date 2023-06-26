import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  template: ` <p>authenticating....</p> `,
  styles: [],
})
export class AuthCallbackComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly authService: NbAuthService,
    private readonly router: Router,
  ) {
    this.authService
      .authenticate('task-strategy')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.router.navigateByUrl(authResult.getRedirect()).then();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
