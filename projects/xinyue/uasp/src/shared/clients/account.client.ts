import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  GET, POST,
  KuHttpService,
  HttpResult,
} from '@xinyue/core';

import { KuLoginUser } from '../models';

export const URL_ACCOUNT_GET = '/account/get';
export const URL_ACCOUNT_PROFILE = '/account/profile';
export const URL_ACCOUNT_CHANGE_PWD = '/account/change-pwd';

/** 当前已经登录账号相关的 WebApi 客户端访问器。 */
@Injectable({
  providedIn: 'root',
})
export class KuAccountClient extends KuHttpService {

  @GET(URL_ACCOUNT_GET)
  getInfo(): Observable<HttpResult<KuLoginUser>> | any {
    return null;
  }

  @GET(URL_ACCOUNT_PROFILE)
  getProfile(): Observable<HttpResult<KuLoginUser>> | any {
    return null;
  }

  @POST(URL_ACCOUNT_PROFILE)
  updateProfile(): Observable<HttpResult<KuLoginUser>> | any {
    return null;
  }

  @POST(URL_ACCOUNT_CHANGE_PWD)
  changePassword(): Observable<HttpResult<any>> | any {
    return null;
  }
}
