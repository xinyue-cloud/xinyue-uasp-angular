import { Injectable }                from '@angular/core';
import { KuConfigService, KuConfig } from '@xinyue/core';

@Injectable()
export class UrlConfigService extends KuConfigService {

  private readonly $config: KuConfig = {
    apiUrl: 'http://localhost:8086/api',
    routes: {
      login: '/login',
      home : '/blank',
    },
  };

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
