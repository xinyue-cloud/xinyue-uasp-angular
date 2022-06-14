import { Injectable }             from '@angular/core';
import { Router }                 from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { KuLoggerService }        from '../../logger';

import { KuAlertService, KuConfigService, KuTipService, KuUtilService } from '../../services';

/**
 * Http 异常响应结果处理器。
 */
@Injectable()
export class KuHttpErrorHandler {

  constructor(
    private router: Router,
    private logger: KuLoggerService,
    private config: KuConfigService,
    private tip: KuTipService,
    private alert: KuAlertService,
    private util: KuUtilService,
  ) {
  }

  public onCatch(err: any, source: Observable<any>): Observable<any> {

    switch (err.status) {
      case 400:
        this.handleBadRequest(err);
        break;
      case 401:
        this.handleUnauthorized(err);
        break;
      case 403:
        this.handleForbidden(err);
        break;
      case 404:
        this.handleNotFound(err);
        break;
      case 500:
        this.handleServerError(err);
        break;
      default:
        break;
    }
    return throwError(err);
  }

  private handleBadRequest(err: any): void {
    if (err._body) {
      try {
        const bodyParsed = err.body;
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError(err);
      }
    } else {
      this.handleServerError(err);
    }
  }

  private handleUnauthorized(err: any): void {
    this.alert.warning('将跳转至登录页，以重新登录。', '本次会话已过期').then((value: any) => {
      this.util.navigate([this.config.loginUrl()]);
    });
  }

  private handleForbidden(err: any): void {
    this.tip.warning(err.error.bind(err).message, '没有访问权限！');
  }

  private handleNotFound(err: any): void {
    this.tip.error('要访问的资源不存在。' + err.url);
  }

  private handleServerError(err: any): void {
    this.tip.error('服务器内部错误。' + err.url);
  }

  private handleErrorMessages(err: any): void {
    this.tip.error('Error', err.message);
  }

}
