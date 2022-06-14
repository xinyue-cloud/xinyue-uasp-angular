export abstract class KuConfigService {

  /** 获取 API 根路径地址 */
  apiUrl(): string {
    return '';
  }

  /** 获取登录URL地址 */
  loginUrl(): string {
    return 'login';
  }

  /** 获取登录后主页地址 */
  homeUrl(): string {
    return '';
  }

  /** 获取默认的请求头 */
  defaultHeaders(): any {
    return {};
  }

  /** 获取一个未指定的配置项  */
  get(key: string): any {
    return {};
  }

}
