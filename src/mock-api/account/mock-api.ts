import { Injectable }        from "@angular/core";
import { assign, cloneDeep } from "lodash-es";

import {
  URL_ACCOUNT_MENUS,
  URL_ACCOUNT_PROFILE,
} from "@xinyue/ui";
import {
  HttpResult,
  KuMockApiService,
  KuUtilService,
} from "@xinyue/core";

import { MENUS_DATA } from "./menu-data";
import { USER_INFO }  from "./user-data";

@Injectable({
  providedIn: "root",
})
export class AccountMockApi {

  private readonly _menuBag = MENUS_DATA;
  private readonly _user = USER_INFO;

  constructor(
    private mockApiService: KuMockApiService,
    private utils: KuUtilService,
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
          body  : HttpResult.okBody(cloneDeep(this._user)),
        };
      });
  }

  registerAccountMenus(): void {

    this.mockApiService
      .onGet(URL_ACCOUNT_MENUS)
      .onReply((request) => {
        return {
          status: 200,
          body  : HttpResult.okBody(cloneDeep(this._menuBag)),
        };
      });
  }

}
