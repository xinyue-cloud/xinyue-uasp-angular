import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';

import {
  KuConfigService,
  KuUtilService,
}                        from '@xinyue/core';
import { KuAuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class KuAuthGuard implements CanActivate {

  constructor(
    private config: KuConfigService,
    private utils: KuUtilService,
    private authService: KuAuthService,
  ) {
  }

  canActivate(): boolean {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    this.utils.navigateAfter([this.config.loginUrl()]);
    return false;
  }

}
