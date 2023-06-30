import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';

import {
  NbAuthModule,
  NbAuthOAuth2Token,
  NbAuthResult,
  NbOAuth2AuthStrategy,
  NbOAuth2GrantType,
  nbAuthCreateToken,
} from '@nebular/auth';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NB_WINDOW } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback.component';

function parseQueryParams(params: string): { [key: string]: string } {
  return params
    ? params.split('&').reduce((acc: any, part: string) => {
        const item = part.split('=');
        acc[item[0]] = decodeURIComponent(item[1]);
        return acc;
      }, {})
    : {};
}

describe('AuthCallbackComponent', () => {
  let strategy: NbOAuth2AuthStrategy;
  let httpMock: HttpTestingController;
  let routeMock: any;
  let windowMock: any;

  const successMessages = ['You have been successfully authenticated.'];

  const tokenSuccessResponse = {
    access_token: '2YotnFZFEjr1zCsicMWpAA',
    expires_in: 3600,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
    example_parameter: 'example_value',
  };

  const successToken = nbAuthCreateToken(
    NbAuthOAuth2Token,
    tokenSuccessResponse,
    'strategy'
  ) as NbAuthOAuth2Token;

  beforeEach(() => {
    windowMock = { location: { href: '' } };
    routeMock = { snapshot: { params: {}, queryParams: {}, fragment: '' } };

    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [
        NbOAuth2AuthStrategy,
        { provide: ActivatedRoute, useFactory: () => routeMock },
        { provide: NB_WINDOW, useFactory: () => windowMock }, // useValue will clone, we need reference
      ],
      declarations: [ AuthCallbackComponent ]
    });
  });

  beforeEach(waitForAsync(
    inject(
      [NbOAuth2AuthStrategy, HttpTestingController],
      (_strategy: any, _httpMock: any) => {
        strategy = _strategy;
        httpMock = _httpMock;

        strategy.setOptions({});
      }
    )
  ));

  afterEach(() => {
    httpMock.verify();
  });

  describe('out of the box: type CODE', () => {

    const basicOptions = {
      name: 'strategy',
      baseEndpoint: 'http://example.com/',
      clientId: 'clientId',
    };

    beforeEach(() => {
      strategy.setOptions(basicOptions);
    });


    it('redirect to auth server', (done: DoneFn) => {
      windowMock.location = {
        set href(value: string) {
          expect(value).toEqual(
            'http://example.com/authorize?response_type=code&client_id=clientId'
          );
          done();
        },
      };

      strategy.authenticate().subscribe(() => {});
    });

    it('handle success redirect and sends correct token request', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate().subscribe((result: NbAuthResult) => {
        expect(result).toBeTruthy();
        expect(result.isSuccess()).toBe(true);
        expect(result.isFailure()).toBe(false);
        expect(result.getToken().getValue()).toEqual(successToken.getValue());
        expect(result.getToken().getOwnerStrategyName()).toEqual(
          successToken.getOwnerStrategyName()
        );
        expect(result.getMessages()).toEqual(successMessages);
        expect(result.getErrors()).toEqual([]); // no error message, response is success
        expect(result.getRedirect()).toEqual('/');
        done();
      });

      httpMock
        .expectOne((req) => {
          const params: any = parseQueryParams(req.body);
          return (
            req.url === 'http://example.com/token' &&
            req.headers.get('Content-Type') ===
              'application/x-www-form-urlencoded' &&
            decodeURIComponent(params.grant_type) ===
              NbOAuth2GrantType.AUTHORIZATION_CODE &&
            decodeURIComponent(params.code) === 'code' &&
            decodeURIComponent(params.client_id) === 'clientId' &&
            !params.redirect_uri
          );
        })
        .flush(tokenSuccessResponse);
    });
  });
});
