import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable }                                      from 'rxjs';
import { HttpResult }                                           from '@xinyue/core';

import { KuLoginUser }     from '../../../models';
import { KuAccountClient } from '../../../clients';

@Injectable({
  providedIn: 'root',
})
export class KuInitAuthResolver implements Resolve<KuLoginUser> {

  constructor(
    private accountClient: KuAccountClient,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KuLoginUser> {
    return this.accountClient.getInfo().pipe(
      map((result: HttpResult<KuLoginUser>) => {
        if (result.success) {
          return result.data;
        } else {
          console.error(result.message ?? 'get loginUser.');
        }
      }),
    );
  }

}
