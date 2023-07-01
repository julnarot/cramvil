import { Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
@Component({
  selector: 'app-auth-login',
  template: `
    <ng-container *ngIf="!!token; else noLogged">
      <p>{{ token | json }}</p>
      <button nbButton status="warning" *ngIf="token" (click)="logout()">
        Sign Out
      </button>
    </ng-container>
    <ng-template #noLogged>
      <p>You are'nt logged</p>
      <button nbButton status="success" (click)="login()">Sign In</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthLoginComponent {
  token: any = null;

  constructor(private readonly authService: NbAuthService) {
    this.authService.onTokenChange().subscribe((token: any) => {
      this.token = null;
      if (token && token.isValid()) {
        this.token = token;
      }
    });
  }

  login() {
    this.authService.authenticate('email').subscribe();
  }

  logout() {
    this.authService.logout('email').subscribe();
  }
}
