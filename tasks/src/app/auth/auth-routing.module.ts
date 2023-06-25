import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login.component';
import { AuthCallbackComponent } from './components/auth-callback.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLoginComponent,
  },
  {
    path: 'callback',
    component: AuthCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
