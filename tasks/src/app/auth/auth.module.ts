import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './components/auth-login.component';
import { AuthCallbackComponent } from './components/auth-callback.component';


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
