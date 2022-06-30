import { Injectable }      from '@angular/core';
import { KuConfigService } from '@xinyue/core';
import { KuAppConfig }     from '@xinyue/uasp';

import { environment } from '../../../environments/environment';

@Injectable()
export class AppConfigService extends KuConfigService {

  private $config: KuAppConfig = {
    apiUrl   : '',
    routes   : {
      login: '/passport/login',
      home : '/uasp/tasks',
    },
    brand    : {
      logoClass : '',
      logoStyles: undefined,
      logoUrl   : 'assets/img/AdminLTELogo.png',
      logoAlt   : 'AdminLTE Logo',
      brandText : '应用开发支撑平台',
    },
    copyright: {
      year    : '2021',
      homeUrl : 'https://www.xinyue.cloud',
      homeText: 'XinYue 应用开发支撑平台',
      version : '1.0.0',
    },
  };

  constructor() {
    super();
    this.$config.apiUrl = environment.apiUrl;
  }

  /** 获取 API 根路径地址 */
  override apiUrl(): string {
    return this.$config.apiUrl;
  }

  /** 获取登录URL地址 */
  override loginUrl(): string {
    return this.$config.routes.login;
  }

  /** 获取登录后主页地址 */
  override homeUrl(): string {
    return this.$config.routes.home;
  }

  /** 获取默认的请求头 */
  override defaultHeaders(): any {
    return {};
  }

  /** 获取一个未指定的配置项  */
  override get(key: string): any {
    // @ts-ignore
    return this.$config[key];
  }

}
