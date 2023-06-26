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
          clientId: 'P2hTnPMATcBvFBbuUbbPDgP6q5nvqdIrWMgvY6dB',
          // clientScret: 'Pz5R0w3R7QuczBWYNibHpOG0gmBw3hvGuoFiNzlCNiw7A5AfXkAWJ2jIDqlEXCfzdoAdQj22AlPYEkIbeLpDHjB4OMgZGTti1tKWbGNpf8lELupqECRxElN2m45MzJCC',
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
