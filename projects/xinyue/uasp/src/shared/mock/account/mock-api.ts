import { Injectable }        from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';

import { HttpResult, KuMockApiService } from '@xinyue/core';

import { MENUS_DATA }                           from './menu-data';
import { URL_ACCOUNT_GET, URL_ACCOUNT_PROFILE } from '../../clients';
import { USER_INFO }                            from './user-data';

@Injectable({
  providedIn: 'root',
})
export class AccountMockApi {

  private readonly _menuBag = MENUS_DATA;
  private readonly _userInfo = USER_INFO;

  constructor(
    private mockApiService: KuMockApiService,
  ) {
    this.registerHandlers();
  }

  registerHandlers(): void {
    this.registerAccountProfile();
    this.registerAccountMenus();
  }

  registerAccountProfile(): void {

    this.mockApiService
      .onGet(URL_ACCOUNT_PROFILE)
      .onReply((request) => {
        return {
          status: 200,
          body  : HttpResult.okBody(cloneDeep(this._userInfo)),
        };
      });
  }

  registerAccountMenus(): void {

    this.mockApiService
      .onGet(URL_ACCOUNT_GET)
      .onReply((request) => {
        return {
          status: 200,
          body  : HttpResult.okBody(cloneDeep(this._menuBag)),
        };
      });
  }

}
