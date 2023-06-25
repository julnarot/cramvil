import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-auth-login',
  template: `
    <p>{{ token | json }}</p>
    <button nbButton status="success" *ngIf="!token" (click)="login()">
      Sign In
    </button>
    <button nbButton status="warning" *ngIf="token" (click)="logout()">
      Sign Out
    </button>
  `,
  styles: [],
})
export class AuthLoginComponent {
  token: any = null;

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe((token: any) => {
      this.token = null;
      if (token && token.isValid()) {
        this.token = token;
      }
    });
  }

  login() {
    this.authService.authenticate('task-strategy').subscribe((lo: any) => {
      console.log(lo);
    });
  }

  logout() {
    this.authService.logout('task-strategy').subscribe(() => {});
  }
}
