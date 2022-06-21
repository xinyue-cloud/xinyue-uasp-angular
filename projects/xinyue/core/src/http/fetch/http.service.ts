import { HttpClient }                    from '@angular/common/http';
import { Injectable }                    from '@angular/core';
import { KuLoggerService }               from '../../logger';
import { KuConfigService, KuTipService } from '../../services';

import { KuHttpErrorHandler } from './handler';

/** 支持的数据媒体类型 */
export enum MediaType {
  JSON,
  FORM_DATA
}

/** 用于支持Http请求的服务基类。 */
@Injectable()
export abstract class KuHttpService {

  public constructor(
    public config: KuConfigService,
    public http: HttpClient,
    public logger: KuLoggerService,
    public tip: KuTipService,
    public errorHandler: KuHttpErrorHandler,
  ) {
  }

  public getBaseUrl(): string {
    return this.config.apiUrl();
  }

  public getDefaultHeaders(): any {
    return this.config.defaultHeaders();
  }

}
