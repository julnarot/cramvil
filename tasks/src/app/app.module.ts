import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import {
  NbAuthModule,
  NbAuthOAuth2Token,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'task-strategy',
          baseEndpoint: `http://localhost:8000/o/`,
          clientId: 'herePublicCliendId',
          authorize: {
            responseType: NbOAuth2ResponseType.CODE,
            scope: 'read write',
            redirectUri: `http://localhost:4200/oauth2/callback`,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
