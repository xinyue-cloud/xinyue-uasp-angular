import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { forkJoin, Observable } from 'rxjs';
import { map }                  from 'rxjs/operators';
import { InitialData }          from './app.types';
import { KuAccountClient }      from '@xinyue/ui';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {

  constructor(
    private accountClient: KuAccountClient,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InitialData> {

    console.info('InitialDataResolver()');

    // @ts-ignore
    return forkJoin([
      this.accountClient.getMenus(),
      this.accountClient.getProfile(),
    ]).pipe(
      // @ts-ignore
      map(([navResult, uiResult]) => ({
        navigation: {
          // @ts-ignore
          sidebar: navResult.data.sidebar,
          // @ts-ignore
          header: navResult.data.header,
        },
        // @ts-ignore
        user: uiResult.data,
      })),
    );

  }

}
