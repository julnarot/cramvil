import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  NbAuthModule,
  NbAuthOAuth2Token,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'email',
          baseEndpoint: `http://localhost:8000/o/`,
          clientId: 'P2hTnPMATcBvFBbuUbbPDgP6q5nvqdIrWMgvY6dB',
          authorize: {
            responseType: NbOAuth2ResponseType.CODE,
            scope: 'read write',
            redirectUri: `http://localhost:4200/auth/callback`,
          },
          token: {
            endpoint: 'token/',
            class: NbAuthOAuth2Token,
          },
          redirect: {
            success: '/',
          },
        }),
      ],
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
