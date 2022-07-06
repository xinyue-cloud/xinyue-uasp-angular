import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable }                                      from 'rxjs';
import { HttpResult, KuTipService }                             from '@xinyue/core';

import { KuLoginUser }     from '../../../models';
import { KuAccountClient } from '../../../clients';

@Injectable({
  providedIn: 'root',
})
export class KuInitAuthResolver implements Resolve<KuLoginUser> {

  constructor(
    private client: KuAccountClient,
    private tip: KuTipService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KuLoginUser> {
    return this.client.getInfo().pipe(
      map((result: HttpResult<KuLoginUser>) => {
        if (result.success) {
          return result.data;
        } else {
          this.tip.error(result.message ?? 'error get loginUser.')
        }
      }),
    );
  }

}
