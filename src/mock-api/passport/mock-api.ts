import { Injectable } from '@angular/core';

import { URL_PASSPORT_SIGNIN, URL_PASSPORT_SIGN_UP } from '@xinyue/ui';
import { HttpResult, KuMockApiService }              from '@xinyue/core';

import { JwtService } from '../../app/shared/services/jwt.service';
import { USER_DATA }  from './user-data';

@Injectable({
  providedIn: 'root',
})
export class PassportMockApi {

  constructor(
    private mockApiService: KuMockApiService,
    private jwt: JwtService,
  ) {
    this.registerHandlers();
  }

  registerHandlers(): void {
    this.registerSignIn();
    this.registerSignUp();
  }

  registerSignIn(): void {

    this.mockApiService
      .onPost(URL_PASSPORT_SIGNIN)
      .onReply((request) => {

        let httpResult: HttpResult<any> | undefined;
        let body = request.body;

        if (body.username === body.password) {
          const _users = USER_DATA.filter((x: any) => x.userName === body.username);
          if (_users.length > 0) {
            httpResult = HttpResult.okBody(this.jwt.generateJWTToken(_users[0].userName));
          }
        }

        if (!httpResult) {
          httpResult = HttpResult.error('用户名或密码错误。');
        }

        return {
          status: 200,
          body  : httpResult,
        };
      });
  }

  registerSignUp(): void {

    this.mockApiService
      .onPost(URL_PASSPORT_SIGN_UP)
      .onReply((request) => {

        let httpResult: HttpResult<any> | undefined;
        let body = request.body;

        if (body.username === body.password) {
          const _users = USER_DATA.filter((x: any) => x.userName === body.username);
          if (_users.length > 0) {
            httpResult = HttpResult.okBody(this.jwt.generateJWTToken(_users[0].userName));
          }
        }

        if (!httpResult) {
          httpResult = HttpResult.error('用户名或密码错误。');
        }

        return {
          status: 200,
          body  : httpResult,
        };
      });
  }
}
