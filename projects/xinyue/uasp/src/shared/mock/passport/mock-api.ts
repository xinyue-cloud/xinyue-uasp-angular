import { Injectable } from '@angular/core';

import { HttpResult, KuJwtService, KuMockApiService } from '@xinyue/core';
import { URL_PASSPORT_SIGN_UP, URL_PASSPORT_SIGNIN }  from '../../clients';
import { USER_DATA }                                  from './user-data';

@Injectable({
  providedIn: 'root',
})
export class PassportMockApi {

  constructor(
    private mockApiService: KuMockApiService,
    private jwt: KuJwtService,
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
            httpResult = HttpResult.okBody(this.jwt.generateToken(_users[0].userName));
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
          const _users = USER_DATA.filter(x => x.userName === body.username);
          if (_users.length > 0) {
            httpResult = HttpResult.okBody(this.jwt.generateToken(_users[0].userName));
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
