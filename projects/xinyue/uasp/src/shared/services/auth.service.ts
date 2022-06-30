import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import {
  HttpResult,
  KuConfigService,
  KuLoggerService,
  KuTokenStorage,
  KuUtilService,
  TOKEN_STORAGE_NAME,
}                           from '@xinyue/core';

import { KuLoginUser, KuProfile } from '../models';
import { KuPassportClient }       from '../clients';

@Injectable({
  providedIn: 'root',
})
export class KuAuthService {

  private _profile!: KuProfile;
  private _permissions: { [key: string]: string[] } = {};
  private _roles: string[] = [];
  private _helper = new JwtHelperService();

  constructor(
    private logger: KuLoggerService,
    private utils: KuUtilService,
    private config: KuConfigService,
    private tokenStorage: KuTokenStorage,
    private passportClient: KuPassportClient,
  ) {
  }

  loginAdapter(token: string): void {
    this.token = token;
  }

  logout(): void {
    this.removeToken();
    this.utils.navigateAfter([this.config.loginUrl()]);
  }

  refresh(): void {
    this.passportClient.refreshToken().subscribe((result: HttpResult<string>) => {
      if (result.success) {
        this.token = result.data;
      }
    });
  }

  setLoginUser(loginUser: KuLoginUser | any): void {
    this._profile = loginUser.profile;
    this._permissions = loginUser.permissions;
    this._roles = loginUser.roles;
  }

  /** 获取当前登录用户信息 */
  get profile(): KuProfile {
    return this._profile;
  }

  hasPermission(module: string, action?: string): boolean {
    let result = false;
    if (this._permissions.hasOwnProperty(module)) {
      result = true;
      if (typeof action === 'string') {
        result = this._permissions[module].includes(action);
      }
    }
    return result;
  }

  hasRole(role: string): boolean {
    return this._roles.includes(role);
  }

  /** 获取本地 JwtToken 字符串 */
  get token(): string {
    return this.tokenStorage.getItem(TOKEN_STORAGE_NAME);
  }

  /**
   * 设置本地 JwtToken 值
   * @param token jwt令牌
   */
  set token(token: string) {
    this.tokenStorage.setItem(TOKEN_STORAGE_NAME, token);
  }

  /** 从本地移除 JwtToken */
  removeToken(): boolean {
    if (this.token) {
      this.tokenStorage.removeItem(TOKEN_STORAGE_NAME);
    }
    return true;
  }

  /** 获取 jwt 过期时间 */
  getExpirationDate(): Date | null {
    return this._helper.getTokenExpirationDate(this.token);
  }

  /** 判断本地 JwtToken 是否已经过期 */
  isTokenExpired(): boolean {

    const token = this.token;
    if (token) {
      return this._helper.isTokenExpired(token);
    }
    return true;
  }

}
