import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Body, Headers, POST,
  KuHttpService,
  HttpResult,
} from '@xinyue/core';

import { KuSmsCodeForm, KuRestPwdForm, KuLoginForm } from '../models';

export const URL_PASSPORT_SIGNIN = '/passport/sign-in';
export const URL_PASSPORT_REFRESH = '/passport/refresh';
export const URL_PASSPORT_LOGOUT = '/passport/logout';
export const URL_PASSPORT_RESET_PWD = '/passport/reset-pwd';
export const URL_PASSPORT_SIGN_UP = '/passport/sign-up';
export const URL_PASSPORT_IMG_CODE = '/passport/img-code';
export const URL_PASSPORT_SMS_CODE = '/passport/sms-code';

@Injectable({
  providedIn: 'root',
})
export class KuPassportClient extends KuHttpService {

  @POST(URL_PASSPORT_SIGNIN)
  @Headers({ Authorization: 'Bearer null' })
  loginToken(@Body form: KuLoginForm): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_REFRESH)
  refreshToken(): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_LOGOUT)
  logoutToken(): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_RESET_PWD)
  resetPassword(@Body body: KuRestPwdForm): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_SIGN_UP)
  signupUser(@Body body: KuRestPwdForm): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_IMG_CODE)
  sendImageCode(): Observable<HttpResult<string>> | any {
    return null;
  }

  @POST(URL_PASSPORT_SMS_CODE)
  sendSmsCode(@Body body: KuSmsCodeForm): Observable<HttpResult<string>> | any {
    return null;
  }
}
